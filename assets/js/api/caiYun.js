const errorCodeMsgCaiYun = {
  "API rate limit exceeded": "API请求太过频繁，请稍后再试。可进入设置页面切换其他API。",
  9999: "其他错误，可进入设置页面切换其他API",
};

// Map to a list of languages that support Google Voice.
const LANG_MAP_CAIYUN = {
  zh: "zh-CN",
  en: "en",
  ja: "ja",
};

async function lookupCaiYun(word) {
  let data = [];
  const api = options.caiYun.api;
  const token = utools.dbStorage.getItem("caiYunToken");
  if (!token) {
    data.push({
      title: errTitle,
      description: errMsgEmptyConf,
    });
    return data;
  }

  let source = utools.dbStorage.getItem("caiYunSource") || "auto";
  let target = utools.dbStorage.getItem("caiYunTarget") || "auto";
  utools.dbStorage.setItem("caiYunSource", source);
  utools.dbStorage.setItem("caiYunTarget", target);

  if ("auto" == target) {
    target = isChinese(word) ? "en" : "zh";
  }
  let type = source + "2" + target;

  let body = {
    source: word,
    trans_type: type,
    request_id: "utools_translate" + new Date().getTime() + "_" + Math.random(),
    detect: true,
  };

  let headers = {
    "content-type": "application/json",
    "x-authorization": "token " + token,
  };
  let response;
  try {
    response = await post(api, JSON.stringify(body), headers);
    let message = response?.message;
    if (!message) {
      const tran = response?.target;
      if (tran) {
        let langSource = "";
        if ("auto" == source) {
          switch (target) {
            case "zh":
              langSource = "en";
              break;
            case "en":
            case "ja":
              langSource = "zh-CN";
              break;
          }
        } else {
          langSource = LANG_MAP_CAIYUN[source];
        }
        let phoneticHtml = getPhoneticHtml(word, tran, langSource, target);
        let dataTitle = `<span class="translation">${tran}</span>${phoneticHtml}`;
        data.push({
          title: dataTitle,
          description: "基本释义",
        });
      }
    } else {
      let errMsg = errorCodeMsgCaiYun[message];
      data.push({
        title: errTitle,
        description: errMsg,
      });
    }
  } catch (error) {
    let errorCode = response?.errorCode ? response?.errorCode : error?.errorCode;
    let errorMsg = errorCodeMsgCaiYun[errorCode]
      ? errorCodeMsgCaiYun[errorCode]
      : errorCodeMsgCaiYun[errorCodeOther];
    data.push({
      title: errTitle,
      description: errorMsg,
    });
  }
  return data;
}
