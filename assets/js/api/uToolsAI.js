async function lookupUToolsAI(word) {
  let data = [];

  let langSource = isChinese(word) ? "zh-CN" : "en";
  let langTarget = langSource == "en" ? "zh-CN" : "en";
  let uToolsAI = utools.dbStorage.getItem("uToolsAI");
  let model = uToolsAI ? uToolsAI : null;
  const messages = [
    {
      role: "system",
      content: DEFAULT_PROMPT,
    },
    {
      role: "user",
      content: word,
    },
  ];

  try {
    let response = await utools.ai({ model, messages });
    let tran = response?.content;
    if (!response || !tran) {
      data.push({
        title: errTitle,
        description: "翻译错误，可进入设置页面切换其他API",
      });
      return data;
    }
    let phoneticHtml = getPhoneticHtml(word, tran, langSource, langTarget);
    let dataTitle = `<span class="translation">${tran}</span>${phoneticHtml}`;
    data.push({
      title: dataTitle,
      description: "基本释义",
    });
  } catch (error) {
    data.push({
      title: errTitle,
      description: "翻译错误，可进入设置页面切换其他API",
    });
  }
  return data;
}
