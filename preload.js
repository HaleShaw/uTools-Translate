const https = require("https");
const crypto = require("crypto");

/**
 *
 * @param {String} host host.
 * @param {String} path path.
 * @param {Object} headers headers.
 * @param {String} payload request data.
 * @returns
 */
window.doPost = function (host, path, headers, payload) {
  return new Promise((resolve, reject) => {
    let req = https.request(
      {
        hostname: host,
        port: 443,
        path: path,
        method: "POST",
        headers: headers,
      },
      res => {
        let response = "";
        res.on("data", chunk => {
          response += chunk;
        });

        res.on("end", () => {
          resolve(response);
        });
        res.on("error", e => {
          console.error(e);
          reject(e);
        });
      }
    );
    req.write(payload);
    req.end();
  });
};

window.base64 = function (str) {
  return Buffer.from(str).toString("base64");
};

window.MD5 = function (str, encoding = "hex") {
  return crypto.createHash("md5").update(str).digest(encoding);
};

window.SHA256 = function (str, encoding = "hex") {
  return crypto.createHash("sha256").update(str).digest(encoding);
};

window.hmacSHA1 = function (str, secret = "", encoding) {
  return crypto.createHmac("sha1", secret).update(str).digest(encoding);
};

window.hmacSHA256 = function (str, secret = "", encoding) {
  return crypto.createHmac("sha256", secret).update(str).digest(encoding);
};

window.getHash = function (str, encoding = "hex") {
  return crypto.createHash("sha256").update(str).digest(encoding);
};
