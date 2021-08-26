const errorCodeMsgCaiYun = {
  "API rate limit exceeded": "API请求太过频繁，请稍后再试",
};
async function lookUpCaiYun(word) {
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
  let response = await caiYunPost(api, body, headers);
  let message = response?.message;
  if (!message) {
    const tran = response?.target;
    if (tran) {
      const phoneticEn = getPhoneticEn(word);
      const phoneticUs = getPhoneticUs(word);
      let dataTitle = `<span class="translation">${tran}</span><span>英</span>${phoneticEn}<span>美</span>${phoneticUs}`;
      data.push({
        title: dataTitle,
        description: "基本释义",
      });
    }
  } else {
    let errMsg = errorCodeMsgCaiYun[errorCode];
    data.push({
      title: errTitle,
      description: errMsg,
    });
  }
  return data;
}