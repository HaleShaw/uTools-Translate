const errorCodeMsgTencent = {
  ActionOffline: "接口已下线。",
  "AuthFailure.InvalidAuthorization": "请求头部的 Authorization 不符合腾讯云标准。",
  "AuthFailure.InvalidSecretId": "密钥非法（不是云 API 密钥类型）。",
  "AuthFailure.MFAFailure": "MFA 错误。",
  "AuthFailure.SecretIdNotFound":
    "密钥不存在。请在控制台检查密钥是否已被删除或者禁用，如状态正常，请检查密钥是否填写正确，注意前后不得有空格。",
  "AuthFailure.SignatureExpire":
    "签名过期。Timestamp 和服务器时间相差不得超过五分钟，请检查本地时间是否和标准时间同步。",
  "AuthFailure.SignatureFailure":
    "签名错误。签名计算错误，请对照调用方式中的签名方法文档检查签名计算过程。",
  "AuthFailure.TokenFailure": "token 错误。",
  "AuthFailure.UnauthorizedOperation": "请求未授权。请参考 CAM 文档对鉴权的说明。",
  DryRunOperation: "DryRun 操作，代表请求将会是成功的，只是多传了 DryRun 参数。",
  FailedOperation: "操作失败。",
  InternalError: "内部错误。",
  InvalidAction: "接口不存在。",
  InvalidParameter: "参数错误（包括参数格式、类型等错误）。",
  InvalidParameterValue: "参数取值错误。",
  InvalidRequest: "请求 body 的 multipart 格式错误。",
  IpInBlacklist: "IP地址在黑名单中。",
  IpNotInWhitelist: "IP地址不在白名单中。",
  LimitExceeded: "超过配额限制。",
  MissingParameter: "缺少参数。",
  NoSuchProduct: "产品不存在",
  NoSuchVersion: "接口版本不存在。",
  RequestLimitExceeded: "请求的次数超过了频率限制。",
  "RequestLimitExceeded.IPLimitExceeded": "IP限频。",
  "RequestLimitExceeded.UinLimitExceeded": "主账号限频。",
  RequestSizeLimitExceeded: "请求包超过限制大小。",
  ResourceInUse: "资源被占用。",
  ResourceInsufficient: "资源不足。",
  ResourceNotFound: "资源不存在。",
  ResourceUnavailable: "资源不可用。",
  ResponseSizeLimitExceeded: "返回包超过限制大小。",
  ServiceUnavailable: "当前服务暂时不可用。",
  UnauthorizedOperation: "未授权操作。",
  UnknownParameter: "未知参数错误，用户多传未定义的参数会导致错误。",
  UnsupportedOperation: "操作不支持。",
  UnsupportedProtocol: "http(s) 请求协议错误，只支持 GET 和 POST 请求。",
  UnsupportedRegion: "接口不支持所传地域。",
  "FailedOperation.NoFreeAmount":
    "本月免费额度已用完，如需继续使用您可以在机器翻译控制台升级为付费使用。",
  "FailedOperation.ServiceIsolate": "账号因为欠费停止服务，请在腾讯云账户充值。",
  "FailedOperation.UserNotRegistered": "服务未开通，请在腾讯云官网机器翻译控制台开通服务。",
  "InternalError.BackendTimeout": "后台服务超时，请稍后重试。",
  "InternalError.ErrorUnknown": "未知错误。",
  "InternalError.RequestFailed": "请求失败。",
  "InvalidParameter.DuplicatedSessionIdAndSeq": "重复的SessionUuid和Seq组合。",
  "InvalidParameter.SeqIntervalTooLarge": "Seq之间的间隙请不要大于2000。",
  "UnauthorizedOperation.ActionNotFound": "请填写正确的Action字段名称。",
  "UnsupportedOperation.AudioDurationExceed": "音频分片长度超过限制，请保证分片长度小于8s。",
  "UnsupportedOperation.TextTooLong": "单次请求text超过长度限制，请保证单次请求⻓度低于2000。",
  "UnsupportedOperation.UnSupportedTargetLanguage": "不支持的目标语言，请参照语言列表。",
  "UnsupportedOperation.UnsupportedLanguage": "不支持的语言，请参照语言列表。",
  "UnsupportedOperation.UnsupportedSourceLanguage": "不支持的源语言，请参照语言列表。",
};
async function lookUpTencent(word) {
  let data = [];

  const endpoint = options.tencent.api;
  const appId = utools.dbStorage.getItem("tencentAppId");
  const appSecret = utools.dbStorage.getItem("tencentAppSecret");
  if (!appId || !appSecret) {
    data.push({
      title: errTitle,
      description: errMsgEmptyConf,
    });
    return data;
  }

  const service = "tmt";
  const region = "ap-chengdu";
  const action = "TextTranslate";
  const version = "2018-03-21";

  let param = {
    SourceText: word,
    Source: "auto",
    Target: isChinese(word) ? "en" : "zh",
    ProjectId: 0,
  };
  let payload = JSON.stringify(param);

  //时间处理, 获取世界时间日期
  const timestamp = parseInt(new Date().getTime() / 1000);
  const date = getDate(timestamp);

  // ************* 步骤 1：拼接规范请求串 *************

  const httpRequestMethod = "POST";
  const canonicalUri = "/";
  const canonicalQueryString = "";
  const canonicalHeaders =
    "content-type:application/json; charset=utf-8\n" + "host:" + endpoint + "\n";
  const signedHeaders = "content-type;host";
  const hashedRequestPayload = window.SHA256(payload);

  const canonicalRequest =
    httpRequestMethod +
    "\n" +
    canonicalUri +
    "\n" +
    canonicalQueryString +
    "\n" +
    canonicalHeaders +
    "\n" +
    signedHeaders +
    "\n" +
    hashedRequestPayload;

  // ************* 步骤 2：拼接待签名字符串 *************
  const algorithm = "TC3-HMAC-SHA256";
  const hashedCanonicalRequest = window.SHA256(canonicalRequest);
  const credentialScope = date + "/" + service + "/" + "tc3_request";
  const stringToSign =
    algorithm + "\n" + timestamp + "\n" + credentialScope + "\n" + hashedCanonicalRequest;

  // ************* 步骤 3：计算签名 *************

  const kDate = window.hmacSHA256(date, "TC3" + appSecret);
  const kService = window.hmacSHA256(service, kDate);
  const kSigning = window.hmacSHA256("tc3_request", kService);
  const signature = window.hmacSHA256(stringToSign, kSigning, "hex");

  // ************* 步骤 4：拼接 Authorization *************
  const authorization =
    algorithm +
    " " +
    "Credential=" +
    appId +
    "/" +
    credentialScope +
    ", " +
    "SignedHeaders=" +
    signedHeaders +
    ", " +
    "Signature=" +
    signature;

  let headers = {
    Authorization: authorization,
    "Content-Type": "application/json; charset=UTF-8",
    "X-TC-Action": action,
    "X-TC-Timestamp": timestamp.toString(),
    "X-TC-Version": version,
    "X-TC-Region": region,
  };

  let response = await post("https://" + endpoint, payload, headers);
  const errorCode = response.Response?.Error?.Code;
  if (!errorCode) {
    const tran = response.Response.TargetText;
    const phoneticEn = getPhoneticEn(word);
    const phoneticUs = getPhoneticUs(word);
    let dataTitle = `<span class="translation">${tran}</span><span>英</span>${phoneticEn}<span>美</span>${phoneticUs}`;
    data.push({
      title: dataTitle,
      description: "基本释义",
    });
  } else {
    let errMsg = errorCodeMsgTencent[errorCode];
    data.push({
      title: errTitle,
      description: errMsg,
    });
  }
  return data;
}

function getDate(timestamp) {
  const date = new Date(timestamp * 1000);
  const year = date.getUTCFullYear();
  const month = ("0" + (date.getUTCMonth() + 1)).slice(-2);
  const day = ("0" + date.getUTCDate()).slice(-2);
  return `${year}-${month}-${day}`;
}
