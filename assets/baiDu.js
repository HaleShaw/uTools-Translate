const CryptoJS = require("./crypto-js");
const setting = require("./setting");
const utils = require("./utils");
const errorCodeMsg = {
  52001: "请求超时",
  52002: "系统错误",
  52003: "未授权用户",
  54000: "必填参数为空",
  54001: "签名错误",
  54003: "访问频率受限",
  54004: "账户余额不足",
  54005: "长query请求频繁",
  58000: "客户端IP非法",
  58001: "译文语言方向不支持",
  58002: "服务当前已关闭",
  90107: "认证未通过或未生效"
};

async function lookupBaiDu(word) {
  let data = [];
  const api = setting.options.baiDu.api;
  let appId = utools.dbStorage.getItem("baiDuAppId");
  let appSecret = utools.dbStorage.getItem("baiDuAppSecret");
  if (!appId || !appSecret) {
    const errMsg = `配置参数为空，请按 ${setting.constant.hotKey} 进行设置`;
    data.push({
      title: setting.constant.errTitle,
      description: errMsg,
      icon: setting.constant.dataIcon
    });
    return data;
  }

  const salt = new Date().getTime();
  const sign = getSign(appId, word, salt, appSecret);
  let param = {
    q: word,
    appid: appId,
    salt: salt,
    from: "auto",
    to: "zh",
    sign: sign
  };
  let response = await utils.post(api, param);
  const errorCode = response.error_code;
  if (!errorCode) {
    const trans = response.trans_result;
    if (trans && trans.length != 0) {
      for (let i = 0; i < trans.length; i++) {
        data.push({
          title: trans[i].dst,
          description: "基本释义",
          icon: setting.constant.dataIcon
        });
      }
    }
  } else {
    let errMsg = errorCodeMsg[errorCode];
    data.push({
      title: setting.constant.errTitle,
      description: errMsg,
      icon: setting.constant.dataIcon
    });
  }
  return data;
}

function getSign(appId, query, salt, appSecret) {
  return CryptoJS.MD5(appId + query + salt + appSecret).toString();
}

module.exports = {
  lookupBaiDu
};
