const options = {
  youDaoOld: {
    name: "内置有道",
    api: "http://fanyi.youdao.com/openapi.do?keyfrom=WoxLauncher&key=1247918016&type=data&doctype=json&version=1.1&q=",
  },
  youDaoWap: {
    name: "有道移动版",
    api: "https://m.youdao.com/dict?le=eng&q=",
  },
  youDao: {
    name: "有道",
    api: "http://openapi.youdao.com/api",
  },
  baiDu: {
    name: "百度",
    api: "https://fanyi-api.baidu.com/api/trans/vip/translate",
  },
};

// 设置窗口的高度。
const settingHeight = 219;

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
  let saveFailed = false;
  switch (option) {
    case Object.keys(options)[2]:
      if (isBlank(youDaoAppId) || isBlank(youDaoAppSecret)) {
        $("#msg").text(errMsgEmptyApp);
        document.getElementById("youDaoAppId").focus();
        saveFailed = true;
      }
      break;
    case Object.keys(options)[3]:
      if (isBlank(baiDuAppId) || isBlank(baiDuAppSecret)) {
        $("#msg").text(errMsgEmptyApp);
        document.getElementById("baiDuAppId").focus();
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
  $("#setting").hide();
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
