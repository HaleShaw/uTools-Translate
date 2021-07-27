const http = require("http");
const errorCodeOther = 9999;
const errorCodeFrequently = 302;

function get(url) {
  return new Promise((resolve, reject) => {
    http
      .get(url, res => {
        res.setEncoding("utf8");
        let rawData = "";
        res.on("data", chunk => {
          rawData += chunk;
        });
        res.on("end", () => {
          try {
            if (rawData.indexOf("frequent-error") != -1) {
              resolve({
                errorCode: errorCodeFrequently
              });
            } else {
              const parsedData = JSON.parse(rawData);
              resolve(parsedData);
            }
          } catch (e) {
            console.error(e.message);
            reject({ errorCode: errorCodeOther, message: e.message });
          }
        });
      })
      .on("error", e => {
        console.error(e.message);
        reject({ errorCode: errorCodeOther, message: e.message });
      });
  });
}

function post(url, param) {
  return new Promise((resolve, reject) => {
    fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded;charset=UTF-8"
      },
      mode: "cors",
      body: stringify(param)
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

module.exports = {
  get,
  post,
  errorCodeOther
};
