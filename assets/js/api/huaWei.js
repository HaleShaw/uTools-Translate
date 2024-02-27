const errorCodeMsgHuaWei = {
  "APIG.0602": "错误的请求",
  "APIG.0301": "认证信息错误",
  "NLP.0000": "用户不具备公测权限。",
  "NLP.0101": "认证失败。",
  "NLP.0102": "认证信息缺失。",
  "NLP.0103": "认证信息获取失败。",
  "NLP.0301": "请求参数异常。",
  "NLP.0303": "http请求方式不支持。",
  "NLP.0304": "http消息无法读取。",
  "NLP.0305": "http媒体方式不支持。",
  "NLP.0306": "http请求超时。",
  "NLP.0201": "内部服务异常。",
  "NLP.0401": "OBSClient为空。",
  "NLP.0402": "OBSClient关闭失败。",
  "NLP.0403": "OBS上传文件失败。",
  "NLP.0405": "OBS下载文件失败。",
  "NLP.1101": "服务下发失败。",
  "NLP.1102": "服务返回参数解析出错。",
  "NLP.1201": "购买套餐包失败。",
  "NLP.1202": "不可购买。",
  "NLP.1203": "用户帐号欠费。",
  "NLP.1204": "租户该资源被冻结",
  "NLP.1205": "不可重复购买",
  "NLP.1206": "用户未实名",
  "NLP.1207": "无购买权限",
  "NLP.3201": "参数错误。",
  "NLP.3202": "模板解析错误。",
  "NLP.3203": "公式计算错误。",
  "NLP.3204": "模板资源不存在。",
  "NLP.4101": "文件为空或者不存在。",
  "NLP.4201": "NLPU内部服务异常。",
  "NLP.4302": "内部数据解析错误。",
  "NLP.6101": "机器翻译服务内部异常。",
  "NLP.6302": "达到流控上限。",
  "NLP.6303": "无法从OBS桶获取文件。",
  "NLP.6304": "对应任务不存在。",
  "NLP.6305": "不支持的文档格式。",
  "NLP.6306": "无效文件。",
  "NLP.6307": "文档页数超过上限。",
  "NLP.6308": "任务超时。",
  "ModelArts.0203": "无效的token.",
  9999: "其他错误，可进入设置页面切换其他API",
};

async function lookupHuaWei(word) {
  let data = [];
  const api = options.huaWei.api;
  let ak = utools.dbStorage.getItem("huaWeiAK");
  let sk = utools.dbStorage.getItem("huaWeiSK");
  let projectId = utools.dbStorage.getItem("huaWeiProjectId");
  if (!ak || !sk || !projectId) {
    data.push({
      title: errTitle,
      description: errMsgEmptyConf,
    });
    return data;
  }
  let source = utools.dbStorage.getItem("huaWeiSource") || "auto";
  let target = utools.dbStorage.getItem("huaWeiTarget");
  utools.dbStorage.setItem("huaWeiSource", source);
  utools.dbStorage.setItem("huaWeiTarget", target);
  if ((target && target == "auto") || !target) {
    target = isChinese(word) ? "en" : "zh";
  }

  let url = api.replace("project_id", projectId);

  let signer = new window.huaWeiSigner.Signer();
  signer.Key = ak;
  signer.Secret = sk;

  let r = new window.huaWeiSigner.HttpRequest("POST", url);
  r.headers = { "Content-Type": "application/json" };
  r.body = `{"text":"${word}","from":"${source}","to":"${target}","scene":"common"}`;

  var opt = signer.Sign(r);

  let response;
  try {
    response = await window.huaWeiPost(opt, r.body);
    let resData = JSON.parse(response);
    console.log(resData);
    const errorCode = resData?.error_code;
    if (!errorCode) {
      const tran = resData.translated_text;
      if (tran) {
        let langSource = "";
        if ("auto" == source) {
          switch (target) {
            case "en":
              langSource = "zh";
              break;
            case "zh":
              langSource = "en";
              break;
            default:
              langSource = "en";
              break;
          }
        } else {
          langSource = source;
        }
        let phoneticHtml = getPhoneticHtml(word, tran, langSource, target);
        let dataTitle = `<span class="translation">${tran}</span>${phoneticHtml}`;
        data.push({ title: dataTitle, description: "翻译结果" });
      }
    } else {
      data.push({
        title: errTitle,
        description: errorCodeMsgHuaWei[errorCode],
      });
    }
  } catch (error) {
    let errorCode = response?.error_code ? response?.error_code : error?.error_code;
    let errorMsg = errorCodeMsgHuaWei[errorCode]
      ? errorCodeMsgHuaWei[errorCode]
      : errorCodeMsgHuaWei[errorCodeOther];
    data.push({
      title: errTitle,
      description: errorMsg,
    });
  }
  return data;
}
