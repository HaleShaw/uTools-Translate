async function lookupDeepSeek(word) {
  let data = [];

  let langSource = isChinese(word) ? "zh-CN" : "en";
  let langTarget = langSource == "en" ? "zh-CN" : "en";
  let deepSeekAPIKey = utools.dbStorage.getItem("deepSeekAPIKey");
  if (!deepSeekAPIKey) {
    data.push({
      title: errTitle,
      description: errMsgEmptyConf,
    });
    return data;
  }
  let deepSeekModel = utools.dbStorage.getItem("deepSeekModel");
  if (!deepSeekModel) {
    deepSeekModel = "deepseek-chat";
    utools.dbStorage.setItem("deepSeekModel", deepSeekModel);
  }
  let deepSeekPrompt = utools.dbStorage.getItem("deepSeekPrompt");
  if (!deepSeekPrompt) {
    deepSeekPrompt = '你是一个中英文翻译专家，将用户输入的中文翻译成英文，或将用户输入的英文翻译成中文。对于非中文内容，它将提供中文翻译结果。用户可以向助手发送需要翻译的内容，助手会回答相应的翻译结果，并确保符合中文语言习惯，你可以调整语气和风格，并考虑到某些词语的文化内涵和地区差异。同时作为翻译家，需将原文翻译成具有信达雅标准的译文。"信" 即忠实于原文的内容与意图；"达" 意味着译文应通顺易懂，表达清晰；"雅" 则追求译文的文化审美和语言的优美。目标是创作出既忠于原作精神，又符合目标语言文化和读者审美的翻译。';
    utools.dbStorage.setItem("deepSeekPrompt", deepSeekPrompt);
  }

  const url = options.deepSeek.api + options.deepSeek.path;
  const headers = {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${deepSeekAPIKey}`
  };
  const messages = [
    {
      role: "system",
      content: deepSeekPrompt
    },
    {
      role: "user",
      content: word
    }
  ];

  try {
    const response = await fetch(url, {
      method: 'POST',
      headers: headers,
      body: JSON.stringify({
        model: deepSeekModel,
        messages: messages
      })
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(`API Error: ${response.status} - ${errorData.message || 'Unknown error'}`);
    }

    const resData = await response.json();
    const tran = resData.choices?.[0]?.message?.content;
    if (!tran) {
      throw new Error("Invalid response structure");
    }
    let phoneticHtml = getPhoneticHtml(word, tran, langSource, langTarget);
    let dataTitle = `<span class="translation">${tran}</span>${phoneticHtml}`;
    data.push({
      title: dataTitle,
      description: "基本释义",
    });
  } catch (error) {
    console.error(error);
    data.push({
      title: errTitle,
      description: "翻译错误，可进入设置页面切换其他API",
    });
  }
  return data;
}
