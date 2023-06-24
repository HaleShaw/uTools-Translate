const errorCodeMsgYouDaoFree = {
  102: "不支持的语言类型",
  103: "翻译文本过长",
  17005: "服务调用失败",
  9999: "其他错误，可进入设置页面切换其他API",
};

// Map to a list of languages that support Google Voice.
const LANG_MAP_YOUDAOFREE = {
  ZH_CN: "zh-CN",
  EN: "en",
  KR: "ko",
  JA: "ja",
};

async function lookupYouDaoFree(word) {
  let data = [];
  const api = options.youDaoFree.api;
  let source = utools.dbStorage.getItem("youDaoFreeSource") || "auto";
  let target = utools.dbStorage.getItem("youDaoFreeTarget") || "auto";
  let lang = "AUTO" == source || "AUTO" == target ? "AUTO" : `${source}2${target}`;
  let url = `${api}${lang}&i=${word}`;

  let response = await get(url);
  const errorCode = response.errorCode;
  if ("0" == errorCode) {
    const trans = response.translateResult;
    if (trans.length != 0 && trans[0].length != 0) {
      let tran = trans[0][0]?.tgt;
      let langSource = getLangYouDaoFree(word, source);
      let langTarget = getLangYouDaoFree(tran, target);
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
  } else if ("40" == errorCode) {
    data.push({
      title: errTitle,
      description: "语言不支持，可进入设置页面切换其他API",
    });
  } else {
    data.push({
      title: errTitle,
      description: "翻译错误，可进入设置页面切换其他API",
    });
  }
  return data;
}

function getLangYouDaoFree(word, lang) {
  if ("auto" == lang) {
    return isChinese(word) ? "zh-CN" : "en";
  } else {
    return LANG_MAP_YOUDAOFREE[lang];
  }
}
