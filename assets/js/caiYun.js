const errorCodeMsgCaiYun = {
  "API rate limit exceeded": "API请求太过频繁，请稍后再试",
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
  let response = await post(api, JSON.stringify(body), headers);
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

function getType(word) {
  let source = settingObj["caiYun"]["lang"]["source"];
  let target = settingObj["caiYun"]["lang"]["target"];
  let type = "";
  if ("自动" === source && "自动" === target) {
    const flag = isChinese(word);
    const source = flag ? "zh" : "en";
    const target = flag ? "en" : "zh";
    type = source + "2" + target;
  } else if ("自动" === source && "自动" !== target) {
    type = `auto2${options.caiYun.langMap[target]}`;
  } else if ("自动" !== source && "自动" === target) {
    let targetCode = "";
    if ("中文" === source || "日语" === source) {
      targetCode = "en";
    } else if ("英语" === source) {
      targetCode = "zh";
    }
    type = `${options.caiYun.langMap[source]}2${targetCode}`;
  } else {
  }
}
