const errorCodeMsgTranSmart = {
  9999: "其他错误，可进入设置页面切换其他API",
};

async function lookupTranSmart(word) {
  let data = [];
  const api = options.tranSmart.api;
  let source = utools.dbStorage.getItem("tranSmartSource") || "auto";
  let target = utools.dbStorage.getItem("tranSmartTarget") || "auto";
  utools.dbStorage.setItem("tranSmartSource", source);
  utools.dbStorage.setItem("tranSmartTarget", target);

  let body = {
    header: {
      fn: "auto_translation_block",
    },
    source: {
      text_block: word,
      lang: source,
    },
    target: {
      lang: target,
    },
  };
  let headers = {
    "content-type": "application/json",
  };
  let response;
  try {
    response = await post(api, JSON.stringify(body), headers);
    let tran = response?.auto_translation;
    if (tran) {
      let resSource = response?.src_lang;
      let resTarget = response?.tgt_lang;
      let langSource = getLangTranSmartSource(word, source, resSource);
      let langTarget = getLangTranSmartTarget(target, resTarget, source);
      let phoneticHtml = getPhoneticHtml(word, tran, langSource, langTarget);
      let dataTitle = `<span class="translation">${tran}</span>${phoneticHtml}`;
      data.push({
        title: dataTitle,
        description: "翻译结果",
      });
    } else {
      data.push({
        title: errTitle,
        description: errorCodeMsgTranSmart[errorCodeOther],
      });
    }
  } catch (error) {
    data.push({
      title: errTitle,
      description: errorCodeMsgTranSmart[errorCodeOther],
    });
  }
  return data;
}

function getLangTranSmartSource(word, lang, resLang) {
  if (resLang) {
    return resLang;
  }
  if ("auto" == lang) {
    return isChinese(word) ? "zh" : "en";
  } else return lang;
}

function getLangTranSmartTarget(lang, resLang, source) {
  if (resLang) {
    return resLang;
  }
  if ("auto" == lang) {
    if ("en" == source) {
      return "zh";
    } else {
      return "en";
    }
  } else return lang;
}
