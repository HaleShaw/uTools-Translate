async function lookupICiBa(word) {
  let data = [];
  const api = options.iCiBa.api;
  const client = options.iCiBa.client;
  const auth_user = options.iCiBa.auth_user;
  const dict = options.iCiBa.dict;
  const encrypt = options.iCiBa.encrypt;
  const decrypt = options.iCiBa.decrypt;

  let target = isChinese(word) ? "en" : "zh";
  let param = {
    from: "auto",
    t: target,
    q: word,
  };

  const str = client
    .concat(auth_user)
    .concat(dict)
    .concat(word.replace(/(^\s*)|(\s*$)/g, ""));
  let sign = window.MD5(str).toString().substring(0, 16);
  sign = window.AES_ECB_Encrypt(sign, encrypt);

  let url = api
    .replace("param_client", client)
    .replace("param_user", auth_user)
    .concat(encodeURIComponent(sign));

  let response;
  try {
    response = await post(url, stringify(param), formHeaders);
    if (!response.content) {
      data.push({
        title: errTitle,
        description: "其他错误，可进入设置页面切换其他API",
      });
      return data;
    }
    let res = window.AES_ECB_Decrypt(response.content, decrypt);
    let obj = JSON.parse(res);
    let tran = obj.out;
    let langSource = obj.from;
    let langTarget = obj.to;
    let phoneticHtml = getPhoneticHtml(word, tran, langSource, langTarget);
    let dataTitle = `<span class="translation">${tran}</span>${phoneticHtml}`;
    data.push({
      title: dataTitle,
      description: "翻译结果",
    });
  } catch (error) {
    data.push({
      title: errTitle,
      description: error,
    });
  }
  return data;
}
