const errorCodeMsgBaiDu = {
  52001: "请求超时",
  52002: "系统错误",
  52003: "未授权用户",
  54000: "必填参数为空",
  54001: "签名错误",
  54003: "API请求太过频繁，请稍后再试",
  54004: "账户余额不足",
  54005: "长query请求频繁",
  58000: "客户端IP非法",
  58001: "译文语言方向不支持",
  58002: "服务当前已关闭",
  90107: "认证未通过或未生效",
  9999: "其他错误，可进入设置页面切换其他API",
};

// Map to a list of languages that support Google Voice.
const LANG_MAP_BAIDU = {
  zh: "zh-CN",
  en: "en",
  jp: "ja",
  kor: "ko",
  fra: "fr",
  spa: "es",
  th: "th",
  ara: "ar",
  ru: "ru",
  pt: "pt",
  de: "de",
  it: "it",
  el: "el",
  nl: "nl",
  pl: "pl",
  bul: "bg",
  est: "et",
  dan: "da",
  fin: "fi",
  cs: "cs",
  rom: "ro",
  slo: "sl",
  swe: "sv",
  hu: "hu",
  cht: "zh-TW",
  vie: "vi",
};

async function lookupBaiDu(word) {
  let data = [];
  const api = options.baiDu.api;
  let appId = utools.dbStorage.getItem("baiDuAppId");
  let appSecret = utools.dbStorage.getItem("baiDuAppSecret");
  if (!appId || !appSecret) {
    data.push({
      title: errTitle,
      description: errMsgEmptyConf,
    });
    return data;
  }

  const salt = new Date().getTime();
  const sign = getSignBaiDu(appId, word, salt, appSecret);
  let param = {
    q: word,
    appid: appId,
    salt: salt,
    from: "auto",
    to: "auto",
    sign: sign,
  };
  let response;
  try {
    response = await post(api, stringify(param), formHeaders);
    const errorCode = response.error_code;
    if (!errorCode) {
      const trans = response.trans_result;
      if (trans && trans.length != 0) {
        for (let i = 0; i < trans.length; i++) {
          let dataTitle = `<span class="translation">${trans[i].dst}</span>`;
          if (i == 0) {
            let langSource = getLangBaiDu(word, response["from"]);
            let langTarget = getLangBaiDu(trans[i].dst, response["to"]);
            dataTitle += getPhoneticHtml(word, trans[i].dst, langSource, langTarget);
          }
          data.push({
            title: dataTitle,
            description: "基本释义",
          });
        }
      }
    } else {
      let errMsg = errorCodeMsgBaiDu[errorCode];
      data.push({
        title: errTitle,
        description: errMsg,
      });
    }
  } catch (error) {
    let errorCode = response?.errorCode ? response?.errorCode : error?.errorCode;
    let errorMsg = errorCodeMsgBaiDu[errorCode]
      ? errorCodeMsgBaiDu[errorCode]
      : errorCodeMsgBaiDu[errorCodeOther];
    data.push({
      title: errTitle,
      description: errorMsg,
    });
  }
  return data;
}

function getSignBaiDu(appId, query, salt, appSecret) {
  return window.MD5(appId + query + salt + appSecret);
}

function getLangBaiDu(word, lang) {
  let l = LANG_MAP_BAIDU[lang];
  if (!l) {
    l = isChinese(word) ? "zh-CN" : "en";
  }
  return l;
}
