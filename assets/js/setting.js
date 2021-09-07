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
  xunFei: {
    name: "讯飞",
    api: "https://saas.xfyun.cn/ai-application/trans/its",
  },
  youDao: {
    name: "有道",
    api: "http://openapi.youdao.com/api",
  },
  baiDu: {
    name: "百度",
    api: "https://fanyi-api.baidu.com/api/trans/vip/translate",
  },
  caiYun: {
    name: "彩云小译",
    api: "http://api.interpreter.caiyunai.com/v1/translator",
  },
};

// 设置窗口的高度。
const settingHeight = 135 + 29 * 7;

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
  const caiYunToken = document.getElementById("caiYunToken").value;
  let saveFailed = false;
  switch (option) {
    case Object.keys(options)[5]:
      if (isBlank(youDaoAppId) || isBlank(youDaoAppSecret)) {
        $("#msg").text(errMsgEmptyApp);
        document.getElementById("youDaoAppId").focus();
        saveFailed = true;
      }
      break;
    case Object.keys(options)[6]:
      if (isBlank(baiDuAppId) || isBlank(baiDuAppSecret)) {
        $("#msg").text(errMsgEmptyApp);
        document.getElementById("baiDuAppId").focus();
        saveFailed = true;
      }
      break;
    case Object.keys(options)[7]:
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
