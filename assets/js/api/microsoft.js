async function lookupMicrosoft(word) {
  let data = [];
  const api = options.microsoft.api;
  const authApi = options.microsoft.authApi;

  let token = await get(authApi);
  console.log(token);

  if (!token) {
    data.push({
      title: errTitle,
      description: "获取Token失败，可进入设置页面切换其他API",
    });
  }

  let langTarget = isChinese(word) ? "en" : "zh-Hans";
  let url = api.replace("lang", langTarget);

  const headers = {
    authorization: `Bearer ${token}`,
    "Content-Type": "application/json;charset=UTF-8",
  };
  let body = [{ Text: word }];
  try {
    let response = await post(url, JSON.stringify(body), headers);
    let trans = response[0]?.translations;
    if (!trans || trans.length == 0) {
      data.push({
        title: errTitle,
        description: "翻译错误，可进入设置页面切换其他API",
      });
      return data;
    }
    const tran = trans[0]["text"];
    if (tran) {
      let langSource = langTarget == "en" ? "zh-CN" : "en";
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
