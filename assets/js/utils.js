const errorCodeOther = 9999;
const errorCodeFrequently = 302;

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

function post(url, param) {
  return new Promise((resolve, reject) => {
    fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded;charset=UTF-8",
      },
      mode: "cors",
      body: stringify(param),
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

function caiYunPost(url, body, headers) {
  return new Promise((resolve, reject) => {
    fetch(url, {
      method: "POST",
      headers: headers,
      mode: "cors",
      body: JSON.stringify(body),
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

function xunFeiPost(url, form) {
  return new Promise((resolve, reject) => {
    fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded; charset=UTF-8",
      },
      mode: "cors",
      body: form,
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
  return `<button type="button" class="phonetic"><audio src="${ttsApi}${word}&type=1"></audio></button>`;
}

function getPhoneticUs(word) {
  return `<button type="button" class="phonetic"><audio src="${ttsApi}${word}&type=2"></audio></button>`;
}

function isChinese(word) {
  return /[\u4e00-\u9fa5]/.test(word);
}
