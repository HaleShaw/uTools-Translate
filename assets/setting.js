const eleIdName = "setting";
const styleIdName = "settingStyle";
const options = {
  youDaoOld: {
    name: "内置有道",
    api: "http://fanyi.youdao.com/openapi.do?keyfrom=WoxLauncher&key=1247918016&type=data&doctype=json&version=1.1&q="
  },
  youDao: {
    name: "有道",
    api: "http://openapi.youdao.com/api"
  },
  baiDu: {
    name: "百度",
    api: "https://fanyi-api.baidu.com/api/trans/vip/translate"
  }
};
const constant = {
  dataIcon: "logo.png",
  errTitle: "错误",
  hotKey: "Ctrl+T"
};
const settingHeight = 190;
var height;
const styleStr = `
    body {
      padding: 10px 20px;
      font-size: 20px;
    }

    .buttons {
      text-align: center;
    }

    .service > span {
      margin: 3px 3px 3px 20px;
      display: inline-flex;
    }

    .buttons {
      margin-top: 15px;
    }

    .buttons > button {
      font-size: 16px;
      padding: 3px 8px;
    }

    #msg {
      font-size: 16px;
      line-height: 20px;
      color: red;
      display: inline-block !important;
    }`;

const settingStr = `
<div id="services">
    <div class="service">
      <label>
        <input name="service" type="radio" value="youDaoOld" />
        有道
      </label>
      <span>（内置）旧API，不推荐</span>
    </div>
    <div class="service">
      <label>
        <input name="service" type="radio" value="youDao" />
        有道
      </label>
      <span>应用ID</span>
      <input id="youDaoAppId" name="appId" type="input" value="" />
      <span>应用密钥</span>
      <input id="youDaoAppSecret" name="appSecret" type="input" value="" />
    </div>
    <div class="service">
      <label>
        <input name="service" type="radio" value="baiDu" />
        百度
      </label>
      <span>应用ID</span>
      <input id="baiDuAppId" name="appId" type="input" value="" />
      <span>应用密钥</span>
      <input id="baiDuAppSecret" name="appSecret" type="input" value="" />
    </div>
  </div>
  <span id="msg"></span>
  <div class="buttons">
    <button id="btnClose">关闭</button>
    <button id="btnSave">保存</button>
  </div>`;

function open(rawHeight) {
  height = rawHeight;
  utools.setExpendHeight(settingHeight);
  addStyle();
  addSetting();
  loadConfiguration();
  addListener();
  showSetting();
}

function addStyle() {
  if (document.getElementById(styleIdName)) {
    return;
  }
  let styleNode = document.createElement("style");
  styleNode.setAttribute("id", styleIdName);
  styleNode.appendChild(document.createTextNode(styleStr));
  (document.querySelector("head") || document.documentElement).appendChild(styleNode);
}

function addSetting() {
  if (!document.getElementById(eleIdName)) {
    let rawRoot = document.getElementById("root");
    rawRoot.style.display = "none";

    let settingEle = document.createElement("div");
    settingEle.setAttribute("id", eleIdName);
    settingEle.innerHTML = settingStr;
    document.body.append(settingEle);
  }
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
    let input = document.getElementById("youDaoAppId");
    input.value = youDaoAppId;
  }

  let youDaoAppSecret = utools.dbStorage.getItem("youDaoAppSecret");
  if (youDaoAppSecret) {
    let input = document.getElementById("youDaoAppSecret");
    input.value = youDaoAppSecret;
  }

  let baiDuAppId = utools.dbStorage.getItem("baiDuAppId");
  if (baiDuAppId) {
    let input = document.getElementById("baiDuAppId");
    input.value = baiDuAppId;
  }

  let baiDuAppSecret = utools.dbStorage.getItem("baiDuAppSecret");
  if (baiDuAppSecret) {
    let input = document.getElementById("baiDuAppSecret");
    input.value = baiDuAppSecret;
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
    case Object.keys(options)[1]:
      if (isBlank(youDaoAppId) || isBlank(youDaoAppSecret)) {
        let msg = document.getElementById("msg");
        msg.innerText = "应用ID或密钥不能为空！";
        document.getElementById("youDaoAppId").focus();
        saveFailed = true;
      }
      break;
    case Object.keys(options)[2]:
      if (isBlank(baiDuAppId) || isBlank(baiDuAppSecret)) {
        let msg = document.getElementById("msg");
        msg.innerText = "应用ID或密钥不能为空！";
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
  resize();
  utools.showNotification(`切换为${options[option]["name"]}成功！`);
}

function addListener() {
  const btnClose = document.getElementById("btnClose");
  const btnSave = document.getElementById("btnSave");

  btnClose.onclick = function () {
    hideSetting();
    resize();
  };

  btnSave.onclick = function () {
    saveConfiguration();
  };
}

function hideSetting() {
  document.getElementById("msg").innerText = " ";
  let settingEle = document.getElementById(eleIdName);
  if (settingEle) {
    settingEle.style.display = "none";
  }
  let rawRoot = document.getElementById("root");
  rawRoot.style.display = "block";
}

function showSetting() {
  let settingEle = document.getElementById(eleIdName);
  settingEle.style.display = "block";
  let rawRoot = document.getElementById("root");
  rawRoot.style.display = "none";
}

function resize() {
  utools.setExpendHeight(height);
  utools.subInputFocus();
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

module.exports = {
  open,
  options,
  constant
};
