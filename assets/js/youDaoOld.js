const errorCodeMsgYouDaoOld = {
  20: "要翻译的文本过长",
  30: "无法进行有效的翻译",
  40: "不支持的语言类型",
  50: "无效的key",
  302: "API请求太过频繁，请稍后再试。可进入设置页面切换其他API",
  9999: "其他错误，可进入设置页面切换其他API",
};
async function lookupYouDaoOld(word) {
  const url = options.youDaoOld.api + word;
  let response = await get(url);
  const errorCode = response.errorCode;
  let data = [];
  if (0 == errorCode) {
    const trans = response.translation;
    const basic = response.basic;
    if (trans != null) {
      let dataTitle = `<span class="translation">${trans.join(", ")}</span>`;
      if (speak) {
        const phoneticEn = getPhoneticEn(word);
        const phoneticUs = getPhoneticUs(word);
        if (basic && basic.phonetic && basic.phonetic != "") {
          if (basic["us-phonetic"] && basic["us-phonetic"] != "") {
            dataTitle += `<span>英[${basic.phonetic}]</span>${phoneticEn}<span>美[${basic["us-phonetic"]}]</span>${phoneticUs}`;
          } else {
            dataTitle += `<span>[${basic.phonetic}]</span>${phoneticEn}`;
          }
        } else {
          dataTitle += `<span>英</span>${phoneticEn}<span>美</span>${phoneticUs}`;
        }
      }
      data.push({ title: dataTitle, description: "翻译结果" });
    }

    if (basic && basic.explains && basic.explains.length != 0) {
      const explains = basic.explains;
      for (let i = 0; i < explains.length; i++) {
        data.push({
          title: explains[i],
          description: "基本释义",
        });
      }
    }

    const web = response.web;
    if (web != null) {
      for (let i = 0; i < web.length; i++) {
        data.push({
          title: web[i].value.join(", "),
          description: "网络释义：" + web[i].key,
        });
      }
    }
  } else {
    data.push({
      title: errTitle,
      description: errorCodeMsgYouDaoOld[errorCode],
    });
  }
  return data;
}
