const errTitle = "错误";
const errorCodeOther = 9999;
const errorCodeFrequently = 302;
const formHeaders = {
  "Content-Type": "application/x-www-form-urlencoded; charset=UTF-8",
};

function get(url) {
  return new Promise((resolve, reject) => {
    $.get(url, function (data) {
      try {
        console.debug(data);
        if (
          new String(data).indexOf("frequent-error") != -1 ||
          new String(data).indexOf("请求异常频繁") != -1
        ) {
          resolve({
            errorCode: errorCodeFrequently,
          });
        } else {
          resolve(data);
        }
      } catch (e) {
        console.error(e);
        reject({ errorCode: errorCodeOther, message: e });
      }
    });
  });
}

function post(url, body, headers) {
  return new Promise((resolve, reject) => {
    fetch(url, {
      method: "POST",
      headers: headers,
      mode: "cors",
      body: body,
    })
      .then(res => {
        resolve(res.json());
      })
      .catch(e => {
        console.error(e);
        reject({ errorCode: errorCodeOther, message: e });
      });
  });
}

function stringify(obj) {
  return Object.keys(obj)
    .map(key => {
      return encodeURIComponent(key) + "=" + encodeURIComponent(obj[key]);
    })
    .join("&");
}

function getPhoneticEn(word) {
  return `<button type="button" class="phonetic"><audio src="${SPEAK_ENGINE.YouDao}${word}&type=1"></audio></button>`;
}

function getPhoneticUs(word) {
  return `<button type="button" class="phonetic"><audio src="${SPEAK_ENGINE.YouDao}${word}&type=2"></audio></button>`;
}

function getPhoneticGoogle(word, lang) {
  return `<button type="button" class="phonetic"><audio src="${SPEAK_ENGINE.Google}${lang}&q=${word}"></audio></button>`;
}

function getPhoneticHtml(word, result, langSource, langTarget) {
  const speakSwitch = speak["speakSwitch"];
  if (!speakSwitch) {
    return "";
  }
  const speakContent = speak["speakContent"];
  const speakEngine = speak["speakEngine"];
  const str = speakContent == "Source" ? word : result;
  if ("YouDao" == speakEngine) {
    if (
      ("Source" == speakContent && "en" != langSource) ||
      ("Result" == speakContent && "en" != langTarget)
    ) {
      return "";
    } else {
      return `<span>英</span>${getPhoneticEn(str)}<span>美</span>${getPhoneticUs(str)}`;
    }
  } else {
    const lang = speakContent == "Source" ? langSource : langTarget;
    return getPhoneticGoogle(str, lang);
  }
}

function isChinese(word) {
  return /[\u4e00-\u9fa5]/.test(word);
}
