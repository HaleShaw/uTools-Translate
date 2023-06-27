const errorCodeMsgAliYun = {
  10001: "请求超时",
  10002: "系统错误",
  10003: "原文解码失败，请检查原文是否UrlEncode",
  10004: "参数缺失",
  10005: "语项不支持",
  10006: "语种识别失败",
  10007: "翻译失败",
  10008: "字符长度过长",
  19999: "未知异常，可进入设置页面切换其他API",
  10009: "子账号没有权限",
  10010: "账号没有开通服务",
  10011: "子账号服务失败",
  10012: "翻译服务调用失败",
  10013: "账号服务没有开通或者欠费",
  10033: "语种拼写错误",
  9999: "其他错误，可进入设置页面切换其他API",
};

// Map to a list of languages that support Google Voice.
const LANG_MAP_ALIYUN = {
  zh: "zh-CN",
  en: "en",
  sq: "sq",
  ar: "ar",
  am: "am",
  as: "as",
  az: "az",
  ee: "ee",
  ay: "ay",
  ga: "ga",
  et: "et",
  or: "or",
  om: "om",
  eu: "eu",
  be: "be",
  bm: "bm",
  bg: "bg",
  is: "is",
  pl: "pl",
  bs: "bs",
  fa: "fa",
  bho: "bho",
  af: "af",
  tt: "tt",
  da: "da",
  de: "de",
  dv: "dv",
  ti: "ti",
  ru: "ru",
  fr: "fr",
  sa: "sa",
  fil: "tl",
  fi: "fi",
  fy: "fy",
  km: "km",
  ka: "ka",
  gu: "gu",
  gn: "gn",
  kk: "kk",
  ht: "ht",
  ko: "ko",
  ha: "ha",
  nl: "nl",
  ky: "ky",
  gl: "gl",
  ca: "ca",
  cs: "cs",
  kn: "kn",
  co: "co",
  mfe: "kri",
  hbs: "hr",
  qu: "qu",
  ku: "ku",
  la: "la",
  lv: "lv",
  lo: "lo",
  lt: "lt",
  ln: "ln",
  lg: "lg",
  lb: "lb",
  rw: "rw",
  ro: "ro",
  mg: "mg",
  mt: "mt",
  mr: "mr",
  ml: "ml",
  ms: "ms",
  mk: "mk",
  mai: "mai",
  mi: "mi",
  mn: "mn",
  bn: "bn",
  my: "my",
  hmn: "hmn",
  xh: "xh",
  zu: "zu",
  ne: "ne",
  no: "no",
  pa: "pa",
  pt: "pt",
  ps: "ps",
  ny: "ny",
  tw: "ak",
  ja: "ja",
  sv: "sv",
  sm: "sm",
  si: "si",
  eo: "eo",
  sk: "sk",
  sl: "sl",
  sw: "sw",
  sco: "gd",
  ceb: "ceb",
  so: "so",
  tg: "tg",
  te: "te",
  ta: "ta",
  th: "th",
  tr: "tr",
  tk: "tk",
  cy: "cy",
  ur: "ur",
  uz: "uz",
  es: "es",
  he: "iw",
  el: "el",
  haw: "haw",
  sd: "sd",
  hu: "hu",
  sn: "sn",
  hy: "hy",
  ig: "ig",
  ilo: "ilo",
  it: "it",
  yi: "yi",
  hi: "hi",
  su: "su",
  id: "id",
  jv: "jw",
  en: "en",
  yo: "yo",
  vi: "vi",
  "zh-tw": "zh-TW",
  ts: "ts",
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

  let source = utools.dbStorage.getItem("aliYunSource") || "auto";
  let target = utools.dbStorage.getItem("aliYunTarget") || "auto";
  if ("auto" == target) {
    target = isChinese(word) ? "en" : "zh";
  }

  let param = {
    Action: "TranslateGeneral",
    FormatType: "text",
    Scene: "general",
    SourceLanguage: source,
    TargetLanguage: target,
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

  const response = await window.doPost(api, path, null, headers, payload);
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
    const tran = res.Data.Translated;
    let langSource = getLangAliYun(word, source);
    let langTarget = getLangAliYun(tran, target);
    let phoneticHtml = getPhoneticHtml(word, tran, langSource, langTarget);
    const dataTitle = `<span class="translation">${tran}</span>${phoneticHtml}`;
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
      description: errorCodeMsgAliYun[errorCode] ? errorCodeMsgAliYun[errorCode] : errorCode,
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

function getLangAliYun(word, lang) {
  let l = LANG_MAP_ALIYUN[lang];
  if (!l) {
    l = isChinese(word) ? "zh-CN" : "en";
  }
  return l;
}
