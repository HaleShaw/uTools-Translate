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
  let response = await post(api, stringify(param), formHeaders);
  const errorCode = response.error_code;
  if (!errorCode) {
    const trans = response.trans_result;
    if (trans && trans.length != 0) {
      const phoneticEn = getPhoneticEn(word);
      const phoneticUs = getPhoneticUs(word);
      for (let i = 0; i < trans.length; i++) {
        let dataTitle = `<span class="translation">${trans[i].dst}</span>`;
        if (i == 0) {
          dataTitle += `<span>英</span>${phoneticEn}<span>美</span>${phoneticUs}`;
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
  return data;
}

function getSignBaiDu(appId, query, salt, appSecret) {
  return window.MD5(appId + query + salt + appSecret);
}
