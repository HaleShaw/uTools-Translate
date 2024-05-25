async function lookupCNKI(word) {
  let data = [];
  const api = options.cnki.api;
  const secret = options.cnki.secret;
  let token = (await get(options.cnki.tokenApi))["data"];
  if (!token) {
    data.push({
      title: errTitle,
      description: "获取Token失败，可进入设置页面切换其他API",
    });
  }
  let encryptedWord = window.AES_ECB_Encrypt(word, secret).replace(/\//g, "_").replace(/\+/g, "-");
  const payload = { translateType: null, words: encryptedWord };
  const headers = {
    Token: token,
    "Content-Type": "application/json;charset=UTF-8",
  };
  try {
    let response = await post(api, JSON.stringify(payload), headers);
    let tran = response["data"]["mResult"];
    if (tran) {
      let langSource = isChinese(word) ? "zh-CN" : "en";
      let langTarget = isChinese(word) ? "en" : "zh-CN";
      let phoneticHtml = getPhoneticHtml(word, tran, langSource, langTarget);
      let dataTitle = `<span class="translation">${tran}</span>${phoneticHtml}`;
      data.push({
        title: dataTitle,
        description: "基本释义",
      });
    } else {
      data.push({
        title: errTitle,
        description: "翻译错误，可进入设置页面切换其他API",
      });
    }
  } catch (error) {
    data.push({
      title: errTitle,
      description: "翻译错误，可进入设置页面切换其他API",
    });
  }
  return data;
}
