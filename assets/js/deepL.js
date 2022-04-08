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
