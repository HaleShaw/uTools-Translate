const errorCodeMsgYouDaoWeb = {
  103: "翻译文本过长",
  104: "获取密钥失败",
  4411: "API请求太过频繁，请稍后再试。可进入设置页面切换其他API",
  9999: "其他错误，可进入设置页面切换其他API",
};

async function lookupYouDaoWeb(word) {
  let data = [];
  if (word.length > 5000) {
    data.push({
      title: errTitle,
      description: errorCodeMsgYouDaoWeb[103],
    });
    return data;
  }

  let keys = await getKeys();
  if (!keys || !keys.secretKey || !keys.aesKey || !keys.aesIv) {
    data.push({
      title: errTitle,
      description: errorCodeMsgYouDaoWeb[104],
    });
    return data;
  }

  let payload = {
    i: word,
    from: "auto",
    keyid: "webfanyi",
    appVersion: "1.0.0",
    vendor: "web",
    pointParam: "client,mysticTime,product",
    keyfrom: "fanyi.web",
  };
  let queryParams = getQueryParams(
    options.youDaoWeb.client,
    options.youDaoWeb.product,
    keys.secretKey
  );
  let param = Object.assign(payload, queryParams);
  let headers = {
    Accept: "application/json, text/plain, */*",
    Cookie: "OUTFOX_SEARCH_USER_ID=0@127.0.0.1",
    Referer: "https://fanyi.youdao.com/",
    "User-Agent":
      "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/128.0.0.0 Safari/537.36",
  };

  const api = options.youDaoWeb.api;
  const path = options.youDaoWeb.path + "?" + stringify(param);

  let response;
  try {
    response = await window.doPost(api, path, null, headers, encodeURIComponent(stringify(param)));
    let decryptedText = decryptText(response, keys.aesKey, keys.aesIv);
    let resData = JSON.parse(decryptedText);
    console.log(resData);
    let sentences = resData?.translateResult[0];
    let langs = resData.type.replace("zh-CHS", "zh-CN").split("2");
    let langSource = langs[0];
    let langTarget = langs[1];
    let trans;
    if (sentences && sentences.length != 0) {
      trans = sentences.map(item => item.tgt);
    }
    if (trans && trans.length != 0) {
      const tran = trans.join("");
      let phoneticHtml = getPhoneticHtml(word, tran, langSource, langTarget);
      let dataTitle = `<span class="translation">${tran}</span>${phoneticHtml}`;
      data.push({ title: dataTitle, description: "基本释义" });
    }

    let trs = resData?.dictResult?.ec?.word?.trs;
    if (trs && trs.length != 0) {
      for (let i = 0; i < trs.length; i++) {
        data.push({
          title: trs[i].tran,
          description: `变形 ${trs[i].pos}`,
        });
      }
    }
  } catch (error) {
    data.push({
      title: errTitle,
      description: errorCodeMsgYouDaoWeb[9999],
    });
  }
  return data;
}

async function getKeys() {
  const keyURL = "https://dict.youdao.com/webtranslate/key";
  const baseParams = { keyid: "webfanyi-key-getter", pointParam: "client,mysticTime,product" };
  let queryParams = getQueryParams(
    options.youDaoWeb.client,
    options.youDaoWeb.product,
    options.youDaoWeb.key
  );

  let params = Object.assign(baseParams, queryParams);
  let keyRes;
  try {
    keyRes = await get(keyURL + "?" + stringify(params));
    return keyRes?.data;
  } catch (error) {
    console.error(error);
    return null;
  }
}

function getQueryParams(client, product, key) {
  const time = getTimestamp();
  let signStr = window.MD5(`client=${client}&mysticTime=${time}&product=${product}&key=${key}`);
  return {
    client: client,
    product: product,
    mysticTime: time,
    sign: signStr,
  };
}

function decryptText(str, aesKey, aesIv) {
  const txt = str.replace(/-/g, "+").replace(/_/g, "/");
  return window.AES_CBC_Decrypt(txt, aesKey, aesIv);
}
