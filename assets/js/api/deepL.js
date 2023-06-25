const errorCodeMsgDeepL = { 9999: "其他错误，可进入设置页面切换其他API" };
let requestId = 57280004;
async function lookupDeepL(word) {
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

  let response;
  try {
    response = await post(
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
      for (let i = 0; i < trans.length; i++) {
        let beams = trans[i].beams;
        for (let j = 0; j < beams.length; j++) {
          let phoneticHtml = "";
          if (i == 0 && j == 0) {
            let tran = beams[j].postprocessed_sentence;
            let langSource =
              param["params"]["lang"]["source_lang_computed"] == "ZH" ? "zh-CN" : "en";
            let langTarget = langSource == "en" ? "zh-CN" : "en";
            phoneticHtml = getPhoneticHtml(word, tran, langSource, langTarget);
          }
          let dataTitle = `<span class="translation">${tran}</span>${phoneticHtml}`;
          data.push({
            title: dataTitle,
            description: "基本释义",
          });
        }
      }
    }
  } catch (error) {
    let errorCode = response?.errorCode ? response?.errorCode : error?.errorCode;
    let errorMsg = errorCodeMsgDeepL[errorCode]
      ? errorCodeMsgDeepL[errorCode]
      : errorCodeMsgDeepL[errorCodeOther];
    data.push({
      title: errTitle,
      description: errorMsg,
    });
  }
  return data;
}
