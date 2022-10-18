const https = require("https");
const crypto = require("crypto");
var HttpsProxyAgent = require("https-proxy-agent");

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

/**
 * Create the proxy agent.
 * @param {String} host The proxy host address.
 * @param {String} port The proxy port.
 * @returns
 */
window.createAgent = function (host, port) {
  return new HttpsProxyAgent(`${host}:${port}`);
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
