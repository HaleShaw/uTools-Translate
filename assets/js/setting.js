const options = {
  youDaoOld: {
    name: "内置有道",
    api: "http://fanyi.youdao.com/openapi.do?keyfrom=WoxLauncher&key=1247918016&type=data&doctype=json&version=1.1&q=",
    langs: ["自动", "英语", "中文"],
  },
  youDaoWap: {
    name: "有道移动版",
    api: "https://m.youdao.com/dict?le=eng&q=",
    langs: ["自动", "英语", "中文"],
  },
  youDaoWeb: {
    name: "有道网页版",
    api: "https://fanyi.youdao.com/translate?smartresult=dict&smartresult=rule",
    langs: ["自动", "英语", "中文"],
  },
  google: {
    name: "谷歌",
    api: "translate.google.cn",
    path: "/_/TranslateWebserverUi/data/batchexecute",
    langs: ["自动", "英语", "中文"],
  },
  xiaoNiu: {
    name: "小牛",
    api: "https://test.niutrans.com/NiuTransServer/testaligntrans",
    langs: ["自动", "英语", "中文"],
  },
  deepL: {
    name: "DeepL",
    api: "https://www2.deepl.com/jsonrpc?method=LMT_handle_jobs",
    langs: ["自动", "英语", "中文"],
  },
  youDao: {
    name: "有道",
    api: "http://openapi.youdao.com/api",
    langs: ["自动", "英语", "中文"],
  },
  baiDu: {
    name: "百度",
    api: "https://fanyi-api.baidu.com/api/trans/vip/translate",
    langs: [
      "自动",
      "英语",
      "中文",
      "粤语",
      "文言文",
      "日语",
      "韩语",
      "法语",
      "西班牙语",
      "泰语",
      "阿拉伯语",
      "俄语",
      "葡萄牙语",
      "德语",
      "意大利语",
      "希腊语",
      "荷兰语",
      "波兰语",
      "保加利亚语",
      "爱沙尼亚语",
      "丹麦语",
      "芬兰语",
      "捷克语",
      "罗马尼亚语",
      "斯洛文尼亚语",
      "瑞典语",
      "匈牙利语",
      "繁体中文",
      "越南语",
    ],
  },
  aliYun: {
    name: "阿里",
    api: "mt.cn-hangzhou.aliyuncs.com",
    path: "/api/translate/web/general",
    langs: ["自动", "英语", "中文"],
  },
  tencent: {
    name: "腾讯",
    api: "tmt.tencentcloudapi.com",
    langs: ["自动", "英语", "中文", "日语", "韩语"],
  },
  caiYun: {
    name: "彩云小译",
    api: "http://api.interpreter.caiyunai.com/v1/translator",
    langs: ["自动", "英语", "中文", "日语"],
    langMap: { 自动: "auto", 英语: "en", 中文: "zh", 日语: "ja" },
  },
};

// Set the default API.
const defaultAPI = Object.keys(options)[4];

const defaultSpeak = true;

// 设置窗口的高度。
// const settingHeight = 135 + 29 * 11;
const settingHeight = 544;

const errMsgEmptyApp = "应用ID或密钥不能为空！";

var settingObj = {};

function initSetting() {
  utools.setExpendHeight(settingHeight);
  loadConfiguration();
  addSpeakListener();
  addLangListener();
  addExchangeListener();
  addSiteListener();
  addSettingBtnListener();
  addEyeListener();
}

function loadConfiguration() {
  let option = utools.dbStorage.getItem("option");
  if (!option || option.error) {
    // Choose the default API.
    option = defaultAPI;
    utools.dbStorage.setItem("option", option);
  }
  let radios = document.getElementsByName("service");
  for (let i = 0; i < radios.length; i++) {
    if (radios[i].value == option) {
      radios[i].checked = true;
      break;
    }
  }

  loadSpeak();
  loadLang();

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

  let caiYunToken = utools.dbStorage.getItem("caiYunToken");
  if (caiYunToken) {
    document.getElementById("caiYunToken").value = caiYunToken;
  }
}

/**
 * Load the configuration of speak.
 */
function loadSpeak() {
  speak = utools.dbStorage.getItem("speak");
  if (speak === null) {
    // Choose the default speak setting.
    speak = defaultSpeak;
    utools.dbStorage.setItem("speak", speak);
  }

  let speakBtn = document.querySelector("#setting>.speak>img");
  if (speak) {
    speakBtn.setAttribute("src", "./assets/images/speakOn.png");
  } else {
    speakBtn.setAttribute("src", "./assets/images/speakOff.png");
  }
}

/**
 * Load the configuration of lang.
 */
function loadLang() {
  settingObj = utools.dbStorage.getItem("setting");

  let services = Object.keys(options);
  for (let j = 0; j < services.length; j++) {
    let service = services[j];
    if (!settingObj[service]) {
      settingObj[service] = {};
    }
    if (!settingObj[service]["lang"]) {
      settingObj[service]["lang"] = {};
    }
    let langs = options[service]["langs"];

    let sourceValue = settingObj[service]["lang"]["source"] || langs[0];
    let targetValue = settingObj[service]["lang"]["target"] || langs[0];

    let sourceElement = document.querySelector(
      `.service.${service}>.detail>.exchange>select.source`
    );
    let targetElement = document.querySelector(
      `.service.${service}>.detail>.exchange>select.target`
    );
    let htmlStr = "";
    for (let i = 0; i < langs.length; i++) {
      htmlStr += `<option value=${langs[i]}>${langs[i]}</option>`;
    }
    sourceElement.innerHTML = htmlStr;
    targetElement.innerHTML = htmlStr;
    for (let i = 0; i < sourceElement.length; i++) {
      if (sourceValue == sourceElement.options[i].value) {
        sourceElement.options[i].selected = true;
        break;
      }
    }
    for (let i = 0; i < targetElement.length; i++) {
      if (targetValue == targetElement.options[i].value) {
        targetElement.options[i].selected = true;
        break;
      }
    }
  }

  // Save the  setting object to prevent it change.
  utools.dbStorage.setItem("setting", settingObj);
}

function saveConfiguration() {
  let option = $("input[name=service]:checked").val() || Object.keys(options)[0];

  const youDaoAppId = document.getElementById("youDaoAppId").value;
  const youDaoAppSecret = document.getElementById("youDaoAppSecret").value;
  const baiDuAppId = document.getElementById("baiDuAppId").value;
  const baiDuAppSecret = document.getElementById("baiDuAppSecret").value;
  const aliYunAppId = document.getElementById("aliYunAppId").value;
  const aliYunAppSecret = document.getElementById("aliYunAppSecret").value;
  const tencentAppId = document.getElementById("tencentAppId").value;
  const tencentAppSecret = document.getElementById("tencentAppSecret").value;
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
  utools.dbStorage.setItem("caiYunToken", caiYunToken);
  saveLang();
  utools.dbStorage.setItem("setting", settingObj);
  hideSetting();
  utools.showNotification(
    `当前API为：${options[option]["name"]}\n${settingObj[option]["lang"]["source"]} → ${settingObj[option]["lang"]["target"]}`
  );
}

/**
 * Save the setting of language.
 */
function saveLang() {
  let exchanges = document.querySelectorAll(".exchange");
  for (let i = 0; i < exchanges.length; i++) {
    const service = exchanges[i].parentElement.parentElement.classList[1];
    let sourceEle = exchanges[i].querySelector("select.source");
    let targetEle = exchanges[i].querySelector("select.target");
    const sourceValue = getSelectValue(sourceEle);
    const targetValue = getSelectValue(targetEle);
    if (!settingObj[service]) {
      settingObj[service] = {};
    }
    if (!settingObj[service]["lang"]) {
      settingObj[service]["lang"] = {};
    }
    settingObj[service]["lang"]["source"] = sourceValue;
    settingObj[service]["lang"]["target"] = targetValue;
  }
}

/**
 * Get the selected value of select element.
 * @param {Object} select The select element.
 * @returns The selected value of select element.
 */
function getSelectValue(select) {
  let selectOptions = select.options;
  let value = "";
  for (let i = 0; i < selectOptions.length; i++) {
    if (selectOptions[i].selected) {
      value = selectOptions[i].value;
      break;
    }
  }
  return value;
}

/**
 * Add the speak button listener.
 */
function addSpeakListener() {
  $("#setting>.speak>img").click(function () {
    speak = !speak;
    utools.dbStorage.setItem("speak", speak);
    if (speak) {
      $(this).attr("src", "./assets/images/speakOn.png");
    } else {
      $(this).attr("src", "./assets/images/speakOff.png");
    }
  });
}

/**
 * Add the listener of select of language.
 */
function addLangListener() {
  $("select").each((index, element) => {
    $(element).on("change", () => {
      let brother = getBrother($(element)[0]);
      let brotherValue = $(brother[0]).val();
      let thisValue = $(element).val();
      if ("自动" != brotherValue && thisValue == brotherValue) {
        brother[0].selectedIndex = 0;
      }
    });
  });
}

/**
 * Get the brother select element.
 * @param {Object} element The select element.
 * @returns The brother select element.
 */
function getBrother(element) {
  let brotherClass = "source" === element.className ? "target" : "source";
  return $(element).parent().children(`select.${brotherClass}`);
}

/**
 * Add the exchange button listener.
 */
function addExchangeListener() {
  $(".exchange>.icon").each((index, element) => {
    $(element).on("click", () => {
      let sourceEle = $(element).siblings("select.source");
      let targetEle = $(element).siblings("select.target");
      let temp = sourceEle[0].selectedIndex;
      sourceEle[0].selectedIndex = targetEle[0].selectedIndex;
      targetEle[0].selectedIndex = temp;
    });
  });
}

function addSiteListener() {
  $("a.site").each((index, element) => {
    $(element).on("click", () => {
      const url = $(element).attr("href");
      console.log(url);
      utools.shellOpenExternal(url);
    });
  });
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
