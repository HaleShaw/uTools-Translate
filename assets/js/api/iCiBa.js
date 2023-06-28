async function lookupICiBa(word) {
  let data = [];
  const api = options.iCiBa.api;
  const secret = decodeURIComponent(escape(atob(options.iCiBa.secret)));

  let target = isChinese(word) ? "en" : "zh";
  let param = {
    from: "auto",
    t: target,
    q: word,
  };
  let sign = window
    .MD5(secret + word)
    .toString()
    .substring(0, 16);

  let response;
  try {
    response = await post(api + sign, stringify(param), formHeaders);
    let tran = response?.content?.out;
    let langSource = "en" == target ? "zh-CN" : "en";
    let langTarget = "en" == target ? "en" : "zh-CN";
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
