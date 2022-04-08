async function lookupXiaoNiu(word) {
  let data = [];
  const api = options.xiaoNiu.api;

  const flag = isChinese(word);
  const source = flag ? "zh" : "en";
  const target = flag ? "en" : "zh";
  const url = api + `?from=${source}&to=${target}&src_text=${word}`;

  let response = await get(url);
  let resData = JSON.parse(response);
  const tran = resData?.tgt_text;
  if (tran) {
    let phoneticHtml = "";
    if (speak) {
      const phoneticEn = getPhoneticEn(word);
      const phoneticUs = getPhoneticUs(word);
      phoneticHtml = `<span>英</span>${phoneticEn}<span>美</span>${phoneticUs}`;
    }
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
  return data;
}
