const errTitle = "错误";
const errMsgEmptyConf = "配置参数为空，请进入“翻译设置”进行设置";
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
        if (res.ok) {
          resolve(res.json());
        } else {
          reject({ errorCode: res.status, message: res.statusText });
        }
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

/**
 * Get the timestamp.
 * 1685003426
 * @returns timestamp.
 */
function getTimestamp() {
  return parseInt(new Date().getTime() / 1000);
}

/**
 * Get the ISO 8601 time string.
 * YYYYMMDD'T'HHMMSS'Z'
 * @returns The time string.
 */
function getDateTime() {
  return new Date().toISOString().replace(/[:-]|\.\d{3}/g, "");
}

/**
 * Get the date string.
 * 20201212
 * @param {String} dateTime The ISO 8601 time string.
 * @returns The date string.
 */
function getDate(dateTime) {
  return dateTime.substring(0, 8);
}

/**
 * Get the full date string.
 * 2020-12-12
 * @param {String} timestamp timestamp. eg: 1685003426.
 * @returns The full date string.
 */
function getFullDate(timestamp) {
  const date = new Date(timestamp * 1000);
  const year = date.getUTCFullYear();
  const month = ("0" + (date.getUTCMonth() + 1)).slice(-2);
  const day = ("0" + date.getUTCDate()).slice(-2);
  return `${year}-${month}-${day}`;
}
