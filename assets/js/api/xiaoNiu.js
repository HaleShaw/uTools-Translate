const errorCodeMsgXiaoNiu = {
  10000: "输入为空",
  10001: "请求频繁，超出QPS限制",
  10003: "请求字符串长度超过限制",
  10005: "源语编码有问题，非UTF-8",
  9999: "其他错误，可进入设置页面切换其他API",
};
async function lookupXiaoNiu(word) {
  let data = [];
  const api = options.xiaoNiu.api;
  const token = utools.dbStorage.getItem("xiaoNiuToken");
  if (!token) {
    data.push({
      title: errTitle,
      description: errMsgEmptyConf,
    });
    return data;
  }

  const flag = isChinese(word);
  const source = flag ? "zh" : "en";
  const target = flag ? "en" : "zh";
  const url =
    api + `?from=${source}&to=${target}&apikey=${token}&src_text=${encodeURIComponent(word)}`;

  let response = await get(url);
  try {
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
      let errorCode = response?.error_code;
      let errorMsg = errorCodeMsgCaiYun[errorCode]
        ? errorCodeMsgCaiYun[errorCode]
        : errorCodeMsgCaiYun[errorCodeOther];
      data.push({
        title: errTitle,
        description: errorMsg,
      });
    }
  } catch (error) {
    let errorCode = response?.error_code;
    let errorMsg = errorCodeMsgCaiYun[errorCode]
      ? errorCodeMsgCaiYun[errorCode]
      : errorCodeMsgCaiYun[errorCodeOther];
    data.push({
      title: errTitle,
      description: errorMsg,
    });
  }
  return data;
}
