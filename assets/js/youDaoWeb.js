async function lookUpYouDaoWeb(word) {
  let data = [];
  const api = options.youDaoWeb.api;

  const salt = "" + new Date().getTime() + parseInt(10 * Math.random(), 10);
  let key = "]BjuETDhU)zqSxf-=B#7m";
  key = "Y2FYu%TNSbMCxc3t2u^XT";
  const sign = CryptoJS.MD5("fanyideskweb" + word + salt + key).toString();
  const headers = {
    "Content-Type": "application/x-www-form-urlencoded",
    Referer: "http://fanyi.youdao.com/",
  };
  let param = {
    i: encodeURIComponent(word),
    smartresult: "dict",
    client: "fanyideskweb",
    doctype: "json",
    version: 2.1,
    keyfrom: "fanyi.web",
    action: "FY_BY_REALTlME",
  };
  let response = await post(api, stringify(param), formHeaders);
  const errorCode = response?.errorCode;
  if (errorCode == "0") {
    let trans = response?.translateResult;
    if (trans.length > 0) {
      const phoneticEn = getPhoneticEn(word);
      const phoneticUs = getPhoneticUs(word);
      const tran = trans[0][0]?.tgt;
      let dataTitle = `<span class="translation">${tran}</span><span>英</span>${phoneticEn}<span>美</span>${phoneticUs}`;
      data.push({
        title: dataTitle,
        description: "基本释义",
      });
    }
  } else {
    data.push({
      title: errTitle,
      description: "翻译错误",
    });
  }
  return data;
}
