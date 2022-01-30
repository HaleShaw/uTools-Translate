const options = {
  youDaoOld: {
    name: "内置有道",
    api: "http://fanyi.youdao.com/openapi.do?keyfrom=WoxLauncher&key=1247918016&type=data&doctype=json&version=1.1&q=",
  },
  youDaoWap: {
    name: "有道移动版",
    api: "https://m.youdao.com/dict?le=eng&q=",
  },
  youDaoWeb: {
    name: "有道网页版",
    api: "https://fanyi.youdao.com/translate?smartresult=dict&smartresult=rule",
  },
  google: {
    name: "谷歌",
    api: "https://translate.google.cn/translate_a/single?client=gtx&dt=t&dj=1&hl=zh-CN&sl=auto",
  },
  googleNew: {
    name: "谷歌",
    api: "translate.google.cn",
    path: "/_/TranslateWebserverUi/data/batchexecute",
  },
  xunFei: {
    name: "讯飞",
    api: "https://saas.xfyun.cn/ai-application/trans/its",
  },
  deepL: {
    name: "DeepL",
    api: "https://www2.deepl.com/jsonrpc?method=LMT_handle_jobs",
  },
  youDao: {
    name: "有道",
    api: "http://openapi.youdao.com/api",
  },
  baiDu: {
    name: "百度",
    api: "https://fanyi-api.baidu.com/api/trans/vip/translate",
  },
  aliYun: {
    name: "阿里",
    api: "mt.cn-hangzhou.aliyuncs.com",
    path: "/api/translate/web/general",
  },
  tencent: {
    name: "腾讯",
    api: "tmt.tencentcloudapi.com",
  },
  soGou: {
    name: "搜狗",
    api: "http://fanyi.sogou.com/reventondc/api/sogouTranslate",
  },
  caiYun: {
    name: "彩云小译",
    api: "http://api.interpreter.caiyunai.com/v1/translator",
  },
};

// 设置窗口的高度。
const settingHeight = 135 + 29 * 11;

const errMsgEmptyApp = "应用ID或密钥不能为空！";

function initSetting() {
  utools.setExpendHeight(settingHeight);
  loadConfiguration();
  addSettingBtnListener();
  addEyeListener();
}

function loadConfiguration() {
  let option = utools.dbStorage.getItem("option");
  if (!option || option.error) {
    option = Object.keys(options)[0];
    utools.dbStorage.setItem("option", option);
  }
  let radios = document.getElementsByName("service");
  for (let i = 0; i < radios.length; i++) {
    if (radios[i].value == option) {
      radios[i].checked = true;
      break;
    }
  }

  let youDaoAppId = utools.dbStorage.getItem("youDaoAppId");
  if (youDaoAppId) {
    document.getElementById("youDaoAppId").value = youDaoAppId;
  }

  let youDaoAppSecret = utools.dbStorage.getItem("youDaoAppSecret");
  if (youDaoAppSecret) {
    document.getElementById("youDaoAppSecret").value = youDaoAppSecret;
  }

  let baiDuAppId = utools.dbStorage.getItem("baiDuAppId");
  if (baiDuAppId) {
    document.getElementById("baiDuAppId").value = baiDuAppId;
  }

  let baiDuAppSecret = utools.dbStorage.getItem("baiDuAppSecret");
  if (baiDuAppSecret) {
    document.getElementById("baiDuAppSecret").value = baiDuAppSecret;
  }

  let aliYunAppId = utools.dbStorage.getItem("aliYunAppId");
  if (aliYunAppId) {
    document.getElementById("aliYunAppId").value = aliYunAppId;
  }

  let aliYunAppSecret = utools.dbStorage.getItem("aliYunAppSecret");
  if (aliYunAppSecret) {
    document.getElementById("aliYunAppSecret").value = aliYunAppSecret;
  }

  let tencentAppId = utools.dbStorage.getItem("tencentAppId");
  if (tencentAppId) {
    document.getElementById("tencentAppId").value = tencentAppId;
  }

  let tencentAppSecret = utools.dbStorage.getItem("tencentAppSecret");
  if (tencentAppSecret) {
    document.getElementById("tencentAppSecret").value = tencentAppSecret;
  }

  let soGouAppId = utools.dbStorage.getItem("soGouAppId");
  if (soGouAppId) {
    document.getElementById("soGouAppId").value = soGouAppId;
  }

  let soGouAppSecret = utools.dbStorage.getItem("soGouAppSecret");
  if (soGouAppSecret) {
    document.getElementById("soGouAppSecret").value = soGouAppSecret;
  }

  let caiYunToken = utools.dbStorage.getItem("caiYunToken");
  if (caiYunToken) {
    document.getElementById("caiYunToken").value = caiYunToken;
  }
}

function saveConfiguration() {
  let option = Object.keys(options)[0];
  let radios = document.getElementsByName("service");
  for (let i = 0; i < radios.length; i++) {
    if (radios[i].checked) {
      option = radios[i].value;
    }
  }
  const youDaoAppId = document.getElementById("youDaoAppId").value;
  const youDaoAppSecret = document.getElementById("youDaoAppSecret").value;
  const baiDuAppId = document.getElementById("baiDuAppId").value;
  const baiDuAppSecret = document.getElementById("baiDuAppSecret").value;
  const aliYunAppId = document.getElementById("aliYunAppId").value;
  const aliYunAppSecret = document.getElementById("aliYunAppSecret").value;
  const tencentAppId = document.getElementById("tencentAppId").value;
  const tencentAppSecret = document.getElementById("tencentAppSecret").value;
  const soGouAppId = document.getElementById("soGouAppId").value;
  const soGouAppSecret = document.getElementById("soGouAppSecret").value;
  const caiYunToken = document.getElementById("caiYunToken").value;
  let saveFailed = false;
  switch (option) {
    case "youDao":
      if (isBlank(youDaoAppId) || isBlank(youDaoAppSecret)) {
        $("#msg").text(errMsgEmptyApp);
        document.getElementById("youDaoAppId").focus();
        saveFailed = true;
      }
      break;
    case "baiDu":
      if (isBlank(baiDuAppId) || isBlank(baiDuAppSecret)) {
        $("#msg").text(errMsgEmptyApp);
        document.getElementById("baiDuAppId").focus();
        saveFailed = true;
      }
      break;
    case "aliYun":
      if (isBlank(aliYunAppId) || isBlank(aliYunAppSecret)) {
        $("#msg").text(errMsgEmptyApp);
        document.getElementById("aliYunAppId").focus();
        saveFailed = true;
      }
      break;
    case "tencent":
      if (isBlank(tencentAppId) || isBlank(tencentAppSecret)) {
        $("#msg").text(errMsgEmptyApp);
        document.getElementById("tencentAppId").focus();
        saveFailed = true;
      }
      break;
    case "soGou":
      if (isBlank(soGouAppId) || isBlank(soGouAppSecret)) {
        $("#msg").text(errMsgEmptyApp);
        document.getElementById("soGouAppId").focus();
        saveFailed = true;
      }
      break;
    case "caiYun":
      if (isBlank(caiYunToken)) {
        $("#msg").text("Token不能为空！");
        document.getElementById("caiYunToken").focus();
        saveFailed = true;
      }
      break;
    default:
      break;
  }
  if (saveFailed) {
    return;
  }
  utools.dbStorage.setItem("option", option);
  utools.dbStorage.setItem("youDaoAppId", youDaoAppId);
  utools.dbStorage.setItem("youDaoAppSecret", youDaoAppSecret);
  utools.dbStorage.setItem("baiDuAppId", baiDuAppId);
  utools.dbStorage.setItem("baiDuAppSecret", baiDuAppSecret);
  utools.dbStorage.setItem("aliYunAppId", aliYunAppId);
  utools.dbStorage.setItem("aliYunAppSecret", aliYunAppSecret);
  utools.dbStorage.setItem("tencentAppId", tencentAppId);
  utools.dbStorage.setItem("tencentAppSecret", tencentAppSecret);
  utools.dbStorage.setItem("soGouAppId", soGouAppId);
  utools.dbStorage.setItem("soGouAppSecret", soGouAppSecret);
  utools.dbStorage.setItem("caiYunToken", caiYunToken);
  hideSetting();
  utools.showNotification(`切换为${options[option]["name"]}成功！`);
}

function addSettingBtnListener() {
  $("#btnClose").click(function () {
    hideSetting();
  });

  $("#btnSave").click(function (e) {
    saveConfiguration();
  });
}

function addEyeListener() {
  $(".eye").each(function () {
    $(this).click(function (e) {
      const className = $(this).attr("class");
      if (className.indexOf("closed") != -1) {
        $(this).removeClass("closed");
        $(this).addClass("open");
        $(this).prev().attr("type", "text");
      } else if (className.indexOf("open") != -1) {
        $(this).removeClass("open");
        $(this).addClass("closed");
        $(this).prev().attr("type", "password");
      }
    });
  });
}

function hideSetting() {
  $("#msg").html("");
  $("#setting").addClass("hide");
  $("#root").removeClass("hide");
  $("#page").removeClass("hide");
  utools.outPlugin();
}

function isBlank(str) {
  if (str == "" || str == null || str == undefined) {
    return true;
  } else if (str.trim() == "") {
    return true;
  } else {
    return false;
  }
}
