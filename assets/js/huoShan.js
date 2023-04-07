const errorCodeMsgHuoShan = {
  100002: "关键参数缺失，例如Action, Version参数。",
  100004: "缺少请求必要信息，例如：Access Key，Service，Region等。",
  100006: "请求过期或请求的签名时间来自未来。",
  100007: "请求的服务不存在。",
  100008: "请求接口不存在。",
  100009: "请求的Access Key不合法。",
  100010: "签名结果不正确。",
  100013: "子用户拥有的权限不支持当前操作。",
  100014: "内部错误。",
  100016: "服务执行超时。",
  100018: "请求过于频繁，超出了基本限速。",
  100019: "处于熔断状态的服务暂时不可访问，稍后重试。",
  100023: "服务存在故障。",
  100024: "Authorization头格式错误，检查Authorization。",
  100025: "Authorization头中的Credential格式错误，检查Credential。",
  100026: "错误的STS or STS2，可能是多种错误，例如签名错误、过期等。",
  9999: "其他错误，可进入设置页面切换其他API",
};

async function lookupHuoShan(word) {
  const host = options.huoShan.api;
  const action = options.huoShan.action;
  const version = options.huoShan.version;
  const region = options.huoShan.region;
  const service = options.huoShan.service;

  const appId = utools.dbStorage.getItem("huoShanAppId");
  const appSecret = utools.dbStorage.getItem("huoShanAppSecret");
  if (!appId || !appSecret) {
    data.push({
      title: errTitle,
      description: errMsgEmptyConf,
    });
    return data;
  }

  const dateTime = getDateTime();
  const date = getDate(dateTime);

  let param = {
    TargetLanguage: isChinese(word) ? "en" : "zh",
    TextList: [word],
  };

  // 将参数进行格式化，然后Hash加密
  const payload = JSON.stringify(param);
  const payloadHash = window.SHA256(payload);

  // 组装一个标准的请求头，然后Hash加密
  const canonicalRequest = [
    "POST",
    "/",
    "Action=TranslateText&Version=2020-06-01",
    "content-type:application/json",
    `host:${host}`,
    `x-content-sha256:${payloadHash}`,
    `x-date:${dateTime}\n`,
    "content-type;host;x-content-sha256;x-date",
    payloadHash,
  ].join("\n");
  const canonicalRequestHash = window.SHA256(canonicalRequest);

  // 组装签名字符串
  const credentialScope = [date, region, service, "request"].join("/");
  const stringToSign = ["HMAC-SHA256", dateTime, credentialScope, canonicalRequestHash].join("\n");

  // 得到签名用的key
  const kDate = window.hmacSHA256(date, appSecret);
  const kRegion = window.hmacSHA256(region, kDate);
  const kService = window.hmacSHA256(service, kRegion);
  const kSigning = window.hmacSHA256("request", kService);

  // 用签名字符串和签名key，进行HMAC SHA256加密，得到签名
  const signature = window.hmacSHA256(stringToSign, kSigning, "hex");

  // 用签名组装成凭证
  const authorization = [
    "HMAC-SHA256",
    `Credential=${appId}/${date}/${region}/${service}/request,`,
    `SignedHeaders=content-type;host;x-content-sha256;x-date,`,
    `Signature=${signature}`,
  ].join(" ");

  // 将凭证等相关信息封装进headers
  const headers = {
    "Content-Type": "application/json",
    Accept: "application/json",
    HOST: host,
    "X-Date": dateTime,
    "X-Content-Sha256": payloadHash,
    Authorization: authorization,
  };

  const res = await post(`https://${host}/?Action=${action}&Version=${version}`, payload, headers);
  return getData(word, res);
}

/**
 * Create the response data.
 * @param {Object} response The http request response.
 * @returns The List data.
 */
function getData(word, response) {
  let data = [];
  const errorCode = response.ResponseMetadata?.Error?.CodeN;
  if (!errorCode) {
    let tranList = response?.TranslationList;
    if (!tranList && !response.ResponseMetadata) {
      data.push({
        title: errTitle,
        description: "翻译错误",
      });
      return data;
    }

    let tran = tranList[0]["Translation"];
    if (!tran || tran == "" || tran.trim() == "") {
      data.push({
        title: errTitle,
        description: "翻译结果为空",
      });
      return data;
    }
    if (speak) {
      const phoneticEn = getPhoneticEn(word);
      const phoneticUs = getPhoneticUs(word);
      phoneticHtml = `<span>英</span>${phoneticEn}<span>美</span>${phoneticUs}`;
    }
    let dataTitle = `<span class="translation">${tran}</span>${phoneticHtml}`;
    data.push({
      title: dataTitle,
      description: "基本释义",
    });
    return data;
  } else {
    let errorMsg = errorCodeMsgHuoShan[errorCode]
      ? errorCodeMsgHuoShan[errorCode]
      : errorCodeMsgHuoShan[errorCodeOther];
    data.push({
      title: errTitle,
      description: errorMsg,
    });
    return data;
  }
}

/**
 * Get the ISO 8601 time string.
 * YYYYMMDD'T'HHMMSS'Z'
 * @returns The time string.
 */
function getDateTime() {
  return new Date().toISOString().replace(/[:-]|\.\d{3}/g, "");
}

/**
 * Get the date string.
 * @param {String} dateTime The ISO 8601 time string.
 * @returns The date string.
 */
function getDate(dateTime) {
  return dateTime.substring(0, 8);
}
