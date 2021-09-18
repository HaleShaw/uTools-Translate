const errorCodeMsgSoGou = {
  0: "成功",
  1001: "不支持的语言类型",
  1002: "文本过长",
  1003: "无效PID",
  1004: "试用Pid限额已满",
  10041: "pid小语种限额已满",
  1005: "Pid请求流量过高",
  1007: "随机数不存在",
  1008: "签名不存在",
  1009: "签名不正确",
  10010: "文本不存在",
  1050: "内部服务错误",
  1101: "账户余额不足",
  1102: "接口请求过快",
};
async function lookupSoGou(word) {
  let data = [];
  const api = options.soGou.api;
  let appId = utools.dbStorage.getItem("soGouAppId");
  let appSecret = utools.dbStorage.getItem("soGouAppSecret");
  if (!appId || !appSecret) {
    data.push({
      title: errTitle,
      description: errMsgEmptyConf,
    });
    return data;
  }
  const salt = Math.floor(Date.now() / 1000);
  const sign = window.MD5(appId + word + salt + appSecret);
  const from = "auto";
  const to = isChinese(word) ? "en" : "zh-CHS";
  const payload =
    "from=" +
    from +
    "&to=" +
    to +
    "&pid=" +
    appId +
    "&q=" +
    encodeURIComponent(word) +
    "&sign=" +
    sign +
    "&salt=" +
    salt;

  const response = await post(api, payload, formHeaders);
  const errorCode = response?.errorCode;
  if (errorCode == 0) {
    const tran = response.translation;
    const phoneticEn = getPhoneticEn(word);
    const phoneticUs = getPhoneticUs(word);
    let dataTitle = `<span class="translation">${tran}</span><span>英</span>${phoneticEn}<span>美</span>${phoneticUs}`;
    data.push({
      title: dataTitle,
      description: "基本释义",
    });
  } else {
    let errMsg = errorCodeMsgSoGou[errorCode];
    data.push({
      title: errTitle,
      description: errMsg,
    });
  }
  return data;
}
