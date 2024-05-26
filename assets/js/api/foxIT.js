async function lookupFoxIT(word) {
  let data = [];
  const api = options.foxIT.api;

  let langTarget = isChinese(word) ? "en" : "zh-CN";

  let time = Date.parse(new Date());
  let sign = window.MD5(time + "FOXIT_YEE_TRANSLATE").toString();
  let bodyStr = `plateform=web&orginL=auto&targetL=auto&text=${encodeURIComponent(
    word
  )}&timestamp=${time}&sign=${sign}&userId=`;

  try {
    let response = await post(api, bodyStr, formHeaders);
    let tran = response?.result;
    if (!tran) {
      data.push({
        title: errTitle,
        description: "翻译错误，可进入设置页面切换其他API",
      });
      return data;
    }

    let langSource = langTarget == "en" ? "zh-CN" : "en";
    let phoneticHtml = getPhoneticHtml(word, tran, langSource, langTarget);
    let dataTitle = `<span class="translation">${tran}</span>${phoneticHtml}`;
    data.push({
      title: dataTitle,
      description: "基本释义",
    });
  } catch (error) {
    data.push({
      title: errTitle,
      description: "翻译错误，可进入设置页面切换其他API",
    });
  }
  return data;
}
