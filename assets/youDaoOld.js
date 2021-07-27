const setting = require("./setting");
const utils = require("./utils");
const errorCodeMsg = {
  20: "要翻译的文本过长",
  30: "无法进行有效的翻译",
  40: "不支持的语言类型",
  50: "无效的key",
  302: "API请求异常频繁，暂时被封禁，请稍后再试",
  9999: "其他错误"
};
async function lookupYouDaoOld(word) {
  const url = setting.options.youDaoOld.api + word;
  let response = await utils.get(url);
  console.log(response);
  const errorCode = response.errorCode;
  let data = [];
  if (0 == errorCode) {
    const trans = response.translation;
    const basic = response.basic;
    if (trans != null) {
      let dataTitle = trans.join(", ");
      if (basic && basic.phonetic && basic.phonetic != "") {
        if (basic["us-phonetic"] && basic["us-phonetic"] != "") {
          dataTitle += "  英[" + basic.phonetic + "] 美[" + basic["us-phonetic"] + "]";
        } else {
          dataTitle += "  [" + basic.phonetic + "]";
        }
      }
      data.push({ title: dataTitle, description: "翻译结果", icon: setting.constant.dataIcon });
    }

    if (basic && basic.explains && basic.explains.length != 0) {
      const explains = basic.explains;
      for (let i = 0; i < explains.length; i++) {
        data.push({
          title: explains[i],
          description: "基本释义",
          icon: setting.constant.dataIcon
        });
      }
    }

    const web = response.web;
    if (web != null) {
      for (let i = 0; i < web.length; i++) {
        data.push({
          title: web[i].value.join(", "),
          description: "网络释义：" + web[i].key,
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

module.exports = {
  lookupYouDaoOld
};
