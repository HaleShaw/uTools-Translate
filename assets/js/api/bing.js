async function lookupBing(word) {
  let data = [];
  const api = options.bing.api;
  let url = api + encodeURIComponent(word);
  let response = await get(url);

  var parser = new DOMParser();
  let doc = parser.parseFromString(response, "text/html");
  let trans = doc.querySelectorAll(".qdef ul li");
  let forms = doc.querySelector(".qdef .hd_if");
  if (trans && trans.length != 0) {
    for (let i = 0; i < trans.length; i++) {
      let tranStr = "";
      let tranNodes = trans[i].children;
      for (let j = 0; j < tranNodes.length; j++) {
        tranStr += tranNodes[j].innerText.trim() + " ";
      }
      let dataTitle = `<span class="translation">${tranStr.trim()}</span>`;
      if (i == 0 && speak) {
        const phoneticEn = getPhoneticEn(word);
        const phoneticUs = getPhoneticUs(word);
        dataTitle += `<span>英</span>${phoneticEn}<span>美</span>${phoneticUs}`;
      }
      data.push({
        title: dataTitle,
        description: "基本释义",
      });
    }
  } else {
    data.push({
      title: errTitle,
      description: "翻译错误，可进入设置页面切换其他API",
    });
    return data;
  }

  if (forms) {
    data.push({
      title: forms.innerText.trim(),
      description: "变形",
    });
  }

  return data;
}
