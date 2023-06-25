const errorCodeMsgCaiYun = {
  "API rate limit exceeded": "API请求太过频繁，请稍后再试。可进入设置页面切换其他API。",
  9999: "其他错误，可进入设置页面切换其他API",
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

  const flag = isChinese(word);
  const source = flag ? "zh" : "en";
  const target = flag ? "en" : "zh";
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
        let langSource = "zh" == source ? "zh-CN" : "en";
        let langTarget = "zh" == source ? "en" : "zh-CN";
        let phoneticHtml = getPhoneticHtml(word, tran, langSource, langTarget);
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