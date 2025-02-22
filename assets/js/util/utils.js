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
        // The status will be Success and the status code will be 200 while the real status code is 302.
        // So we can only judge by the content of the translation results.
        if (
          new String(data).indexOf("frequent-error") != -1 ||
          new String(data).indexOf("请求异常频繁") != -1 ||
          new String(data).indexOf("doesn't work properly without JavaScript enabled") != -1
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
    }).fail(function (jqXHR, textStatus, errorThrown) {
      console.error("Do GET Request failed: " + textStatus);
      reject({ errorCode: errorCodeOther, message: textStatus });
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

/**
 * 发起一个POST请求并以流的形式处理响应
 * @param {string} url 请求的URL
 * @param {Object} body 请求的主体内容
 * @returns {Promise} 一个Promise，解析为响应对象或拒绝为错误对象
 */
function postStream(url, body) {
  return new Promise((resolve, reject) => {
    fetch(url, {
      method: "POST",
      body: body,
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then(res => {
        if (res.ok) {
          resolve(res);
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

/**
 * 将对象序列化为URL编码的字符串
 * @param {Object} obj 需要序列化的对象
 * @returns {string} URL编码的字符串
 */
function stringify(obj) {
  return Object.keys(obj)
    .map(key => {
      return encodeURIComponent(key) + "=" + encodeURIComponent(obj[key]);
    })
    .join("&");
}

function getPhoneticEn(word) {
  if (isChinese(word)) {
    return "";
  }
  return `<button type="button" class="phonetic"><audio src="${SPEAK_ENGINE["YouDao"]}${word}&type=1"></audio></button>`;
}

function getPhoneticUs(word) {
  if (isChinese(word)) {
    return "";
  }
  return `<button type="button" class="phonetic"><audio src="${SPEAK_ENGINE["YouDao"]}${word}&type=2"></audio></button>`;
}

function getPhoneticGoogle(word, lang) {
  let langs = Object.values(options.googleAPI.langs);
  if (!lang || "auto" == lang || langs.indexOf(lang) == -1) {
    return "";
  }
  return `<button type="button" class="phonetic"><audio src="${SPEAK_ENGINE["Google"]}${lang}&q=${word}"></audio></button>`;
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

/**
 * Unformat the formatted text.
 * @param {String} text Unformatted text is required.
 * @param {String} changeCase Unformatted formatter.
 */
function UnChangeCase(text, changeCase) {
  if (isChinese(text) || Object.keys(variableNameMap).indexOf(changeCase) == -1) {
    return text;
  }
  let result = "";
  switch (changeCase) {
    case "camelCase":
    case "pascalCase":
      result = UnPascalCase(text);
      break;
    case "snakeCase":
      result = text.replaceAll("_", " ");
      break;
    case "paramCase":
      result = text.replaceAll("-", " ");
      break;
    case "constantCase":
      result = text
        .split("_")
        .map(s => s.toLowerCase())
        .join(" ");
      break;
    default:
      result = text;
      break;
  }
  return result;
}

/**
 * Unformat the formatted text for camelCase and pascalCase.
 * @param {String} text Unformatted text is required.
 */
function UnPascalCase(text) {
  let arr = [];
  let temp = "";
  let flag = false;
  let isUpper = function (charCode) {
    return charCode >= 65 && charCode <= 90;
  };
  for (let i = 0; i < text.length; i++) {
    let now = isUpper(text.charCodeAt(i));
    if (
      (!flag && now) ||
      (flag && now && i + 1 < text.length && !isUpper(text.charCodeAt(i + 1)))
    ) {
      arr.push(temp.toLowerCase());
      temp = text.substring(i, i + 1);
    } else {
      temp += text.substring(i, i + 1);
    }
    flag = now;
    if (i == text.length - 1) {
      arr.push(temp.toLowerCase());
    }
  }
  return arr.join(" ");
}

/**
 * 判断一个字符串是否包含中文字符
 * @param {string} word 需要判断的字符串
 * @returns {boolean} 如果字符串包含中文字符，返回true，否则返回false
 */
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
