async function lookupGoogleAPI(word) {
  let data = [];
  const tl = isChinese(word) ? "en" : "zh-CN";
  let param = `&tl=${tl}&hl=${tl}&q=${word}`;
  const url = options.googleAPI.api + param;

  const transData = await get(url);

  let tran = undefined;
  let basicArr = transData[0];
  let extendArr = transData[1];
  if (basicArr && basicArr[0] && basicArr[0][0]) {
    tran = basicArr[0][0];
    let langSource = tl == "en" ? "zh-CN" : "en";
    let phoneticHtml = getPhoneticHtml(word, tran, langSource, tl);
    let dataTitle = `<span class="translation">${tran}</span>${phoneticHtml}`;
    data.push({
      title: dataTitle,
      description: "基本释义",
    });
  }
  if (!tran) {
    data.push({
      title: errTitle,
      description: "翻译错误",
    });
    return data;
  }

  if (!extendArr) {
    return data;
  }

  for (let i = 0; i < extendArr.length; i++) {
    const extendItem = extendArr[i];
    const extentName = extendItem[0];
    const extendValues = extendItem[1];
    data.push({
      title: extendValues.join(", "),
      description: extentName,
    });
  }

  return data;
}
