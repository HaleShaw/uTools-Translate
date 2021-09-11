async function lookUpXunFei(word) {
  let data = [];
  const api = options.xunFei.api;

  const flag = isChinese(word);
  const source = flag ? "cn" : "en";
  const target = flag ? "en" : "cn";

  const base64Str = window.base64(word);

  let form = new URLSearchParams();
  form.append("from", source);
  form.append("to", target);
  form.append("text", base64Str);

  let response = await post(api, form, formHeaders);
  let err = response.flag;
  if (err) {
    const tran = response?.data?.result?.trans_result?.dst;
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
    data.push({
      title: errTitle,
      description: "翻译错误",
    });
  }
  return data;
}
