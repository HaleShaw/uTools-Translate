async function lookupGoogle(word) {
  let data = [];
  const api = options.google.api;
  const path = options.google.path;
  const tl = isChinese(word) ? "en" : "zh-CN";
  let param =
    "f.req=" +
    encodeURIComponent(
      JSON.stringify([
        [["MkEWBc", JSON.stringify([[word, "auto", tl, true], [null]]), null, "generic"]],
      ])
    );
  const headers = {
    Referer: "https://translate.google.com/",
    "Cache-Control": "max-age=0",
    "Content-Type": "application/x-www-form-urlencoded;charset=utf-8",
  };
  let agent = getAgent();
  const response = await window.doPost(api, path, agent, headers, param);
  let transData;
  try {
    transData = JSON.parse(JSON.parse(response.match(/\[{2}.*\]{2}/g)[0])[0][2]);
  } catch (error) {
    console.error(error);
    data.push({
      title: errTitle,
      description: "翻译错误",
    });
    return data;
  }
  console.debug(transData);
  var transList = transData[1][0][0][5];
  let trans = [];
  for (let index = 0; index < transList.length; index++) {
    var transItem = transList[index];
    trans.push(transItem[0]);
  }

  if (trans && trans.length != 0) {
    let phoneticHtml = "";
    for (let i = 0; i < trans.length; i++) {
      let tran = trans[i];
      if (i == 0) {
        let langSource = tl == "en" ? "zh-CN" : "en";
        phoneticHtml = getPhoneticHtml(word, tran, langSource, tl);
      }
      let dataTitle = `<span class="translation">${tran}</span>${phoneticHtml}`;
      data.push({
        title: dataTitle,
        description: "基本释义",
      });
    }
  }

  // Add the deformation list.
  if (transData[3] && transData[3][5] && transData[3][5][0]) {
    let deformation = transData[3][5][0];
    for (let i = 0; i < deformation.length; i++) {
      let defArr = [];
      if (deformation[i][1]) {
        for (let j = 0; j < deformation[i][1].length; j++) {
          defArr.push(deformation[i][1][j][0]);
        }
        data.push({
          title: defArr.join(", "),
          description: deformation[i][0],
        });
      }
    }
  }
  return data;
}

/**
 * Get the HttpsProxyAgent by proxy host and port.
 * @returns HttpsProxyAgent.
 */
function getAgent() {
  let proxy = utools.dbStorage.getItem("proxy");
  const proxySwitch = proxy["proxySwitch"];
  const proxyHost = proxy["proxyHost"];
  const proxyPort = proxy["proxyPort"];
  if (
    proxy &&
    proxySwitch &&
    undefined != proxyHost &&
    "" != proxyHost &&
    undefined != proxyPort &&
    "" != proxyPort
  ) {
    return window.createAgent(proxyHost, proxyPort);
  } else {
    return null;
  }
}
