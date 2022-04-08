const errorCodeMsgAliYun = {
  10001: "请求超时",
  10002: "系统错误",
  10003: "原文解码失败，请检查原文是否UrlEncode",
  10004: "参数缺失",
  10005: "语项不支持",
  10006: "语种识别失败",
  10007: "翻译失败",
  10008: "字符长度过长",
  19999: "未知异常",
  10009: "子账号没有权限",
  10010: "账号没有开通服务",
  10011: "子账号服务失败",
  10012: "翻译服务调用失败",
  10013: "账号服务没有开通或者欠费",
  9999: "其他错误，可进入设置页面切换其他API",
};
async function lookupAliYun(word) {
  let data = [];
  const api = options.aliYun.api;
  const path = options.aliYun.path;
  let appId = utools.dbStorage.getItem("aliYunAppId");
  let appSecret = utools.dbStorage.getItem("aliYunAppSecret");
  if (!appId || !appSecret) {
    data.push({
      title: errTitle,
      description: errMsgEmptyConf,
    });
    return data;
  }

  let param = {
    Action: "TranslateGeneral",
    FormatType: "text",
    Scene: "general",
    SourceLanguage: isChinese(word) ? "zh" : "en",
    TargetLanguage: isChinese(word) ? "en" : "zh",
    SourceText: encodeURIComponent(word),
  };
  const payload = JSON.stringify(param);
  const signature = getSignature(payload, appId, appSecret);
  const headers = {
    Accept: "application/json",
    "Content-Type": "application/json;chrset=utf-8",
    "Content-MD5": signature.payloadMd5,
    "Content-Length": payload.length,
    Date: signature.date,
    Host: "mt.cn-hangzhou.aliyuncs.com",
    Authorization: signature.authHeader,
    "x-acs-signature-nonce": signature.uuid,
    "x-acs-signature-method": "HMAC-SHA1",
    "x-acs-version": "2019-01-02",
  };

  const response = await window.doPost(api, path, headers, payload);
  let res = "";
  try {
    res = JSON.parse(response);
  } catch (error) {
    console.error(error);
    data.push({
      title: errTitle,
      description: errorCodeMsgAliYun[errorCodeOther],
    });
    return data;
  }
  const errorCode = res.Code;
  if (errorCode == "200") {
    let phoneticHtml = "";
    if (speak) {
      const phoneticEn = getPhoneticEn(word);
      const phoneticUs = getPhoneticUs(word);
      phoneticHtml = `<span>英</span>${phoneticEn}<span>美</span>${phoneticUs}`;
    }
    const dataTitle = `<span class="translation">${res.Data.Translated}</span>${phoneticHtml}`;
    data.push({
      title: dataTitle,
      description: "基本释义",
    });
  } else if (!errorCode) {
    data.push({
      title: errTitle,
      description: errorCodeMsgAliYun[errorCodeOther],
    });
  } else {
    data.push({
      title: errTitle,
      description: errorCodeMsgAliYun.errorCode ? errorCodeMsgAliYun.errorCode : errorCode,
    });
  }
  return data;
}

function getSignature(string, appId, appSecret) {
  const date = new Date().toGMTString();

  // 1.对body做MD5+BASE64加密
  const payloadMd5 = window.MD5(string, "base64");
  const uuid = Math.random().toString().split(".")[1];
  const stringToSign =
    "POST\n" +
    "application/json\n" +
    payloadMd5 +
    "\n" +
    "application/json;chrset=utf-8\n" +
    date +
    "\n" +
    "x-acs-signature-method:HMAC-SHA1\n" +
    "x-acs-signature-nonce:" +
    uuid +
    "\n" +
    "x-acs-version:2019-01-02\n" +
    "/api/translate/web/general";

  // 2.计算 HMAC-SHA1
  const signature = window.hmacSHA1(stringToSign, appSecret, "base64");

  // 打开和URL之间的连接
  const authHeader = "acs " + appId + ":" + signature;

  return { date, payloadMd5, uuid, authHeader };
}
