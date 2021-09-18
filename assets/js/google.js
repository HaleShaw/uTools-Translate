async function lookupGoogle(word) {
  let data = [];
  const api = options.google.api;
  const tl = isChinese(word) ? "en" : "zh-CN";
  const url = api + "&tl=" + tl + "&q=" + word;
  const response = await get(url);
  let trans = response?.sentences;
  if (trans && trans.length != 0) {
    const phoneticEn = getPhoneticEn(word);
    const phoneticUs = getPhoneticUs(word);
    for (let i = 0; i < trans.length; i++) {
      let dataTitle = `<span class="translation">${trans[i]["trans"]}</span>`;
      if (i == 0) {
        dataTitle += `<span>英</span>${phoneticEn}<span>美</span>${phoneticUs}`;
      }
      data.push({
        title: dataTitle,
        description: "基本释义",
      });
    }
  }
  return data;
}
