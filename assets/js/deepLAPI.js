const errorCodeMsgDeepLAPI = {
  403: "连接被拒绝，请检查密钥是否正确",
  429: "API请求太过频繁，请稍后再试",
  456: "已达到账户翻译额度限制，请考虑升级订阅",
  500: "服务器错误，请稍后重试",
  9999: "其他错误，可进入设置页面切换其他API",
};

async function lookupDeepLAPI(word, type) {
  let data = [];
  const secret =
    "free" == type
      ? utools.dbStorage.getItem("deepLFreeSecret")
      : utools.dbStorage.getItem("deepLProSecret");
  if (!secret) {
    data.push({
      title: errTitle,
      description: errMsgEmptyConf,
    });
    return data;
  }

  let api = "free" == type ? options.deepLFree.api : options.deepLPro.api;

  const headers = {
    "Content-Type": "application/x-www-form-urlencoded",
    Authorization: "DeepL-Auth-Key " + secret,
  };
  const targetLang = isChinese(word) ? "EN-US" : "ZH";
  let param = "text=" + encodeURIComponent(word) + "&target_lang=" + targetLang;
  //let agent = getAgent();

  try {
    let response = await post(api, param, headers);
    const translations = response?.translations;
    if (!translations) {
      data.push({
        title: errTitle,
        description: "翻译错误",
      });
      return data;
    }

    for (let i = 0; i < translations.length; ++i) {
      const tran = translations[i]?.text;
      if (tran) {
        let phoneticHtml = "";
        if (speak) {
          const phoneticEn = getPhoneticEn(tran);
          const phoneticUs = getPhoneticUs(tran);
          phoneticHtml = `<span>英</span>${phoneticEn}<span>美</span>${phoneticUs}`;
        }
        let dataTitle = `<span class="translation">${tran}</span>${phoneticHtml}`;
        data.push({
          title: dataTitle,
          description: "基本释义",
        });
      } else {
        let errorCode = response?.error_code;
        let errorMsg = errorCodeMsgDeepLAPI[errorCode]
          ? errorCodeMsgDeepLAPI[errorCode]
          : errorCodeMsgDeepLAPI[errorCodeOther];
        data.push({
          title: errTitle,
          description: errorMsg,
        });
      }
    }
  } catch (error) {
    let errorCode = response?.error_code;
    let errorMsg = errorCodeMsgDeepLAPI[errorCode]
      ? errorCodeMsgDeepLAPI[errorCode]
      : errorCodeMsgDeepLAPI[errorCodeOther];
    data.push({
      title: errTitle,
      description: errorMsg,
    });
  }
  return data;
}
