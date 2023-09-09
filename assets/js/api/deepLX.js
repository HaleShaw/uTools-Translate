const errorCodeMsgDeepLX = {
  9999: "其他错误，可进入设置页面切换其他API",
};

async function lookupDeepLX(word) {

  const api = utools.dbStorage.getItem("deepLXApi") || options.deepLX.api;
  if (!api || "" == api) {
    return [{
      title: errTitle,
      description: errMsgEmptyConf,
    }];
  }

  const isChineseWord = isChinese(word);
  const sourceLang = isChineseWord ? "ZH" : "EN";
  const targetLang = isChineseWord ? "EN" : "ZH";

  const param = {
    text: word,
    source_lang: "auto",
    target_lang: targetLang,
  };

  const headers = {
    "Content-type": "application/json",
  };

  let data = [];

  try {
    const response = await post(api, JSON.stringify(param), headers);
    const translations = response.data;

    if (!translations) {
      data.push({
        title: errTitle,
        description: errorCodeMsgDeepLX[errorCodeOther],
      });
      return data;
    } else {
      const phoneticHtml = getPhoneticHtml(word, translations, sourceLang, targetLang);
      const dataTitle = `<span class="translation">${translations}</span>${phoneticHtml}`;
      data.push({
        title: dataTitle,
        description: "基本释义",
      });
    }

    const alternatives = response?.alternatives;
    if(alternatives){
      for (let i = 0; i < alternatives.length; i++) {
      data.push({
        title: alternatives[i],
        description: "变形",
      });
      }
    }
  } catch (error) {
    data.push({
      title: errTitle,
      description: errorCodeMsgDeepLX[errorCodeOther],
    });
  }

  return data;
}
