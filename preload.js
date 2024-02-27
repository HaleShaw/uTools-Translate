const https = require("https");
const crypto = require("crypto");
const CryptoJS = require("crypto-js");
const signer = require("./assets/js/util/signer");
const HttpsProxyAgent = require("https-proxy-agent");
const fs = require("fs");
const path = require("path");

/**
 *
 * @param {String} host host.
 * @param {String} path path.
 * @param {Object} agent The proxy agent.
 * @param {Object} headers headers.
 * @param {String} payload request data.
 * @returns
 */
window.doPost = function (host, path, agent, headers, payload) {
  return new Promise((resolve, reject) => {
    let req = https.request(
      {
        hostname: host,
        port: 443,
        path: path,
        method: "POST",
        agent: agent,
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

window.huaWeiPost = function (opt, body) {
  return new Promise((resolve, reject) => {
    var req = https.request(opt, function (res) {
      let response = "";
      res.on("data", function (chunk) {
        response += chunk;
      });

      res.on("end", () => {
        resolve(response);
      });

      res.on("error", e => {
        console.error(e);
        reject(e);
      });
    });
    req.write(body);
    req.end();
  });
};

/**
 * Create the proxy agent.
 * @param {String} host The proxy host address.
 * @param {String} port The proxy port.
 * @returns
 */
window.createAgent = function (host, port) {
  return new HttpsProxyAgent(`${host}:${port}`);
};

/**
 * Get the version of the plugin.
 * @returns version string.
 */
window.getVersion = function () {
  const filePath = path.join(__dirname, "plugin.json");
  const text = fs.readFileSync(filePath);
  let data;
  try {
    data = JSON.parse(text);
  } catch (error) {
    console.error(error);
    return "";
  }
  return `v${data?.version}`;
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

window.AESPkcs7 = function (str) {
  const n = options.cnki.secret;
  let e = { mode: CryptoJS.mode.ECB, padding: CryptoJS.pad.Pkcs7 },
    i = CryptoJS.enc.Utf8.parse(n),
    s = CryptoJS.AES.encrypt(str, i, e),
    r = s.toString().replace(/\//g, "_");
  return (r = r.replace(/\+/g, "-")), r;
};

window.huaWeiSigner = signer;
