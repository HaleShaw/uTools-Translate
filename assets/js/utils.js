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
          let data;
          try {
            data = res.json();
          } catch (error) {
            reject({ errorCode: errorCodeOther, message: error });
          }
          resolve(data);
        } else {
          reject({ errorCode: errorCodeOther, message: `${res.status}: ${res.statusText}` });
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
  return `<button type="button" class="phonetic"><audio src="${ttsApi}${word}&type=1"></audio></button>`;
}

function getPhoneticUs(word) {
  return `<button type="button" class="phonetic"><audio src="${ttsApi}${word}&type=2"></audio></button>`;
}

function isChinese(word) {
  return /[\u4e00-\u9fa5]/.test(word);
}
