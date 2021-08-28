const errorCodeMsgYouDao = {
  102: "不支持的语言类型",
  103: "翻译文本过长",
  104: "不支持的API类型",
  105: "不支持的签名类型",
  106: "不支持的响应类型",
  107: "不支持的传输加密类型",
  108: "应用ID无效",
  109: "batchLog格式不正确",
  110: "无相关服务的有效实例，应用没有绑定服务实例，可以新建服务实例，绑定服务实例。",
  111: "开发者账号无效",
  112: "请求服务无效",
  113: "待翻译内容不能为空",
  114: "不支持的图片传输方式",
  116: "strict字段取值无效",
  201: "解密失败，可能为DES,BASE64,URLDecode的错误",
  202: "应用密钥校验失败",
  203: "访问IP地址不在可访问IP列表",
  206: "因为时间戳无效导致签名校验失败",
  207: "重放请求",
  301: "辞典查询失败",
  302: "翻译查询失败",
  303: "服务端的其它异常",
  304: "会话闲置太久超时",
  401: "账户已经欠费，请进行账户充值",
  402: "offlineSDK不可用",
  411: "API请求太过频繁，请稍后再试",
  412: "长请求过于频繁，请稍后访问",
  1001: "无效的OCR类型",
  1002: "不支持的OCR image类型",
  1003: "不支持的OCR Language类型",
  1004: "识别图片过大",
  1201: "图片base64解密失败",
  1301: "OCR段落识别失败",
  1411: "访问频率受限",
  1412: "超过最大识别字节数",
  2003: "不支持的语言识别Language类型",
  2004: "合成字符过长",
  2005: "不支持的音频文件类型",
  2006: "不支持的发音类型",
  2201: "解密失败",
  2301: "服务的异常",
  2411: "API请求太过频繁，请稍后再试",
  2412: "超过最大请求字符数",
  3001: "不支持的语音格式",
  3002: "不支持的语音采样率",
  3003: "不支持的语音声道",
  3004: "不支持的语音上传类型",
  3005: "不支持的语言类型",
  3006: "不支持的识别类型",
  3007: "识别音频文件过大",
  3008: "识别音频时长过长",
  3009: "不支持的音频文件类型",
  3010: "不支持的发音类型",
  3201: "解密失败",
  3301: "语音识别失败",
  3302: "语音翻译失败",
  3303: "服务的异常",
  3411: "API请求太过频繁，请稍后再试",
  3412: "超过最大请求字符数",
  4001: "不支持的语音识别格式",
  4002: "不支持的语音识别采样率",
  4003: "不支持的语音识别声道",
  4004: "不支持的语音上传类型",
  4005: "不支持的语言类型",
  4006: "识别音频文件过大",
  4007: "识别音频时长过长",
  4201: "解密失败",
  4301: "语音识别失败",
  4303: "服务的异常",
  4411: "API请求太过频繁，请稍后再试",
  4412: "超过最大请求时长",
  5001: "无效的OCR类型",
  5002: "不支持的OCR image类型",
  5003: "不支持的语言类型",
  5004: "识别图片过大",
  5005: "不支持的图片类型",
  5006: "文件为空",
  5201: "解密错误，图片base64解密失败",
  5301: "OCR段落识别失败",
  5411: "访问频率受限",
  5412: "超过最大识别流量",
  9001: "不支持的语音格式",
  9002: "不支持的语音采样率",
  9003: "不支持的语音声道",
  9004: "不支持的语音上传类型",
  9005: "不支持的语音识别 Language类型",
  9301: "ASR识别失败",
  9303: "服务器内部错误",
  9411: "访问频率受限（超过最大调用次数）",
  9412: "超过最大处理语音长度",
  10001: "无效的OCR类型",
  10002: "不支持的OCR image类型",
  10004: "识别图片过大",
  10201: "图片base64解密失败",
  10301: "OCR段落识别失败",
  10411: "访问频率受限",
  10412: "超过最大识别流量",
  11001: "不支持的语音识别格式",
  11002: "不支持的语音识别采样率",
  11003: "不支持的语音识别声道",
  11004: "不支持的语音上传类型",
  11005: "不支持的语言类型",
  11006: "识别音频文件过大",
  11007: "识别音频时长过长，最大支持30s",
  11201: "解密失败",
  11301: "语音识别失败",
  11303: "服务的异常",
  11411: "API请求太过频繁，请稍后再试",
  11412: "超过最大请求时长",
  12001: "图片尺寸过大",
  12002: "图片base64解密失败",
  12003: "引擎服务器返回错误",
  12004: "图片为空",
  12005: "不支持的识别图片类型",
  12006: "图片无匹配结果",
  13001: "不支持的角度类型",
  13002: "不支持的文件类型",
  13003: "表格识别图片过大",
  13004: "文件为空",
  13301: "表格识别失败",
  15001: "需要图片",
  15002: "图片过大（1M）",
  15003: "服务调用失败",
  17001: "需要图片",
  17002: "图片过大（1M）",
  17003: "识别类型未找到",
  17004: "不支持的识别类型",
  17005: "服务调用失败",
  9999: "其他错误",
};

async function lookupYouDao(word) {
  let data = [];
  const api = options.youDao.api;
  let appId = utools.dbStorage.getItem("youDaoAppId");
  let appSecret = utools.dbStorage.getItem("youDaoAppSecret");
  if (!appId || !appSecret) {
    data.push({
      title: errTitle,
      description: errMsgEmptyConf,
    });
    return data;
  }

  const salt = new Date().getTime();
  const curtime = Math.round(new Date().getTime() / 1000);
  const sign = getSignYouDao(appId, word, salt, curtime, appSecret);
  let param = {
    q: word,
    appKey: appId,
    salt: salt,
    from: "auto",
    to: "auto",
    sign: sign,
    signType: "v3",
    curtime: curtime,
  };
  let response = await post(api, stringify(param), formHeaders);
  const errorCode = response.errorCode;
  if (errorCode == "0") {
    const trans = response.translation;
    const basic = response.basic;
    if (trans.length != 0) {
      let dataTitle = `<span class="translation">${trans.join(", ")}</span>`;
      const phoneticEn = getPhoneticEn(word);
      const phoneticUs = getPhoneticUs(word);
      if (basic && basic.phonetic && basic.phonetic != "") {
        if (basic["us-phonetic"] && basic["us-phonetic"] != "") {
          dataTitle += `<span>英[${basic.phonetic}]</span>${phoneticEn}<span>美[${basic["us-phonetic"]}]</span>${phoneticUs}`;
        } else {
          dataTitle += `<span>[${basic.phonetic}]</span>${phoneticEn}`;
        }
      } else {
        dataTitle += `<span>英</span>${phoneticEn}<span>美</span>${phoneticUs}`;
      }
      data.push({ title: dataTitle, description: "翻译结果" });
    }

    if (basic && basic.explains && basic.explains.length != 0) {
      const explains = basic.explains;
      for (let i = 0; i < explains.length; i++) {
        data.push({
          title: explains[i],
          description: "基本释义",
        });
      }
    }

    if (basic && basic.wfs && basic.wfs.length != 0) {
      const wfs = basic.wfs;
      let dataTitle = "";
      for (let i = 0; i < wfs.length; i++) {
        dataTitle += `${wfs[i].wf.name}:${wfs[i].wf.value};  `;
      }
      data.push({
        title: dataTitle,
        description: "变形",
      });
    }

    const web = response.web;
    if (web && web.length != 0) {
      for (let i = 0; i < web.length; i++) {
        data.push({
          title: web[i].value.join(", "),
          description: "网络释义：" + web[i].key,
        });
      }
    }
  } else {
    let errMsg = errorCodeMsgYouDao[errorCode];
    data.push({
      title: errTitle,
      description: errMsg,
    });
  }
  return data;
}

function truncate(str) {
  var len = str.length;
  if (len <= 20) return str;
  return str.substring(0, 10) + len + str.substring(len - 10, len);
}

function getSignYouDao(appId, query, salt, curtime, appSecret) {
  const str = appId + truncate(query) + salt + curtime + appSecret;
  return CryptoJS.SHA256(str).toString(CryptoJS.enc.Hex);
}
