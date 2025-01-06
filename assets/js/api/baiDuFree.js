async function lookupBaiDuFree(word) {
  let data = [];

  if (word.length > 1000) {
    data.push({
      title: errTitle,
      description: "翻译文本过长",
    });
    return data;
  }

  const api = options.baiDuFree.api;

  let langSource = isChinese(word) ? "zh" : "en";
  let langTarget = isChinese(word) ? "en" : "zh";

  const payload = {
    query: word,
    from: langSource,
    to: langTarget,
  };

  let response;
  try {
    response = await postStream(api, JSON.stringify(payload));
    const reader = response.body.getReader();
    const decoder = new TextDecoder("utf-8");
    let done, value, resText;
    while ((({ done, value } = await reader.read()), !done)) {
      resText += decoder.decode(value, { stream: true });
    }
    const trans = getTran(resText);
    const tran = trans.tran;
    langSource.replace("zh", "zh-CN");
    langTarget.replace("zh", "zh-CN");
    let phoneticHtml = getPhoneticHtml(word, tran, langSource, langTarget);
    let dataTitle = `<span class="translation">${tran}</span>${phoneticHtml}`;
    data.push({
      title: dataTitle,
      description: "基本释义",
    });

    const symbols = trans.symbols;
    if (symbols && symbols.length != 0) {
      for (let i = 0; i < symbols.length; i++) {
        if (symbols[i].part && symbols[i].part != "" && symbols[i].means.length != 0) {
          // 英文下的结构
          data.push({
            title: symbols[i].means.join(", "),
            description: `变形 ${symbols[i].part}`,
          });
        } else if (!symbols[i].part && symbols[i].means.length != 0) {
          // 中文下的结构
          const means = symbols[i].means;
          for (let j = 0; j < means.length; j++) {
            if (means[j].part && means[j].part != "" && means[j].means.length != 0) {
              data.push({
                title: means[j].means.join(", "),
                description: `变形 ${means[j].part}`,
              });
            }
          }
        }
      }
    }
  } catch (error) {
    console.error(error);
    data.push({
      title: errTitle,
      description: "翻译错误，可进入设置页面切换其他API",
    });
  }
  return data;
}

function getTran(resText) {
  let tranRes = { tran: "", symbols: [] };
  const lines = resText.split("\n");
  for (const line of lines) {
    if (line.startsWith("data: ")) {
      const dataStr = line.substring("data: ".length).trim();
      const data = JSON.parse(dataStr);
      if (data.data && data.data.event === "Translating" && data.data.list) {
        tranRes.tran = data.data.list[0]?.dst;
      } else if (
        data.data &&
        data.data.event === "GetDictSucceed" &&
        data.data.dictResult.simple_means.symbols[0].parts
      ) {
        tranRes.symbols = data.data.dictResult.simple_means.symbols[0].parts;
      }
    }
  }
  return tranRes;
}
