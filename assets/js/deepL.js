const errorCodeMsgDeeplApi = {
  403: "连接被拒绝，请检查DeepL应用密钥是否正确",
  429: "请求过于频繁，请稍后再试",
  456: "已达到账户翻译额度限制，请考虑升级DeepL订阅",
  500: "服务器错误，请稍后重试",
  9999: "未知错误，请稍后重试",
};
let requestId = 57280004;

async function lookupDeeplApi(deeplApiType, word) {
  let data = [];
  const secret = utools.dbStorage.getItem("deeplAppSecret");
  if (!secret) {
    data.push({
      title: errTitle,
      description: errMsgEmptyConf,
    });
    return data;
  }

  let api = "";
  if(deeplApiType == "proApi")
    api = options.deeplPro.api;
  else
    api = options.deeplFree.api;
  
  requestId++;
  const headers = { 
    "Content-Type": "application/x-www-form-urlencoded",
    "Authorization": "DeepL-Auth-Key " + secret,
  };
  const targetLang = isChinese(word) ? "EN-US" : "ZH";
  let param = "text=" + encodeURIComponent(word) + "&target_lang=" + targetLang;
  //let agent = getAgent();

  try {
    let response = await post(api, param, headers);
    const translations = response?.translations;
    if(!translations)
    {
      data.push({
        title: errTitle,
        description: errMsgEmptyConf,
      });
      return data;
    }

    for(let i=0; i<translations.length; ++i)
    {
      const tran = translations[i]?.text;
      if (tran) {
        let phoneticHtml = "";
        if (speak) {
          const phoneticEn = getPhoneticEn(tran);
          const phoneticUs = getPhoneticUs(tran);
          phoneticHtml = `<span>英</span>${phoneticEn}<span>美</span>${phoneticUs}`;
        }
        let dataTitle = `<span class="translation">${tran}</span>${phoneticHtml}`;
        data.push({
          title: dataTitle,
          description: "基本释义",
        });
      } else {
        let errorCode = response?.error_code;
        let errorMsg = errorCodeMsgDeeplApi[errorCode]
          ? errorCodeMsgDeeplApi[errorCode]
          : errorCodeMsgDeeplApi[errorCodeOther];
        data.push({
          title: errTitle,
          description: errorMsg,
        });
      }
    }
  } catch (error) {
    let errorCode = response?.error_code;
    let errorMsg = errorCodeMsgDeeplApi[errorCode]
      ? errorCodeMsgDeeplApi[errorCode]
      : errorCodeMsgDeeplApi[errorCodeOther];
    data.push({
      title: errTitle,
      description: errorMsg,
    });
  }
  return data;
}

async function lookupDeepL(word) {
  const deeplApiType = utools.dbStorage.getItem("deeplApiType");
  if(deeplApiType != "builtin")
  {
    // api lookupc
    return await lookupDeeplApi(deeplApiType, word);
  }

  // builtin lookup
  let data = [];
  const api = options.deepL.api;
  let timestamp = new Date().getTime() - 3000;
  requestId++;
  let param = {
    jsonrpc: "2.0",
    method: "LMT_handle_jobs",
    params: {
      jobs: [
        {
          kind: "default",
          raw_en_sentence: word,
          raw_en_context_before: [],
          raw_en_context_after: [],
          preferred_num_beams: 4,
        },
      ],
      lang: {
        user_preferred_langs: ["EN", "ZH"],
        source_lang_computed: isChinese(word) ? "ZH" : "EN",
        target_lang: isChinese(word) ? "EN" : "ZH",
      },
      priority: 1,
      commonJobParams: {},
      timestamp: timestamp,
    },
    id: requestId,
  };
  const headers = { "content-type": "application/json" };

  let response = await post(
    api,
    JSON.stringify(param).replace('"method":"LMT_handle_jobs"', '"method": "LMT_handle_jobs"'),
    headers
  );
  if (response.error) {
    data.push({
      title: errTitle,
      description: response.error.message,
    });
  } else {
    let trans = response.result.translations;
    let dataTitle = "";
    for (let i = 0; i < trans.length; i++) {
      let beams = trans[i].beams;
      for (let j = 0; j < beams.length; j++) {
        if (i == 0 && j == 0) {
          let phoneticHtml = "";
          if (speak) {
            const phoneticEn = getPhoneticEn(word);
            const phoneticUs = getPhoneticUs(word);
            phoneticHtml = `<span>英</span>${phoneticEn}<span>美</span>${phoneticUs}`;
          }
          dataTitle = `<span class="translation">${beams[j].postprocessed_sentence}</span>${phoneticHtml}`;
        } else {
          dataTitle = beams[j].postprocessed_sentence;
        }
        data.push({
          title: dataTitle,
          description: "基本释义",
        });
      }
    }
  }
  return data;
}
