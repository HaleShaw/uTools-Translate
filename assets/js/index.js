// 语音朗读API。
var ttsApi = "https://dict.youdao.com/dictvoice?audio=";

// 默认被选中的项。
var defaultItem;

// 单个列表高度。
const itemHeight = 48;

// 整个窗口最大高度。
const maxHeight = itemHeight * 10;

// 延时ID。
let delayId = null;

const errTitle = "错误";
const errMsgEmptyConf = "配置参数为空，请进入“翻译设置”进行设置";

// 延迟查询的时间毫秒数。
const delayTime = 300;

utools.onPluginReady(() => {
  utools.setExpendHeight(0);
  const version = utools.getAppVersion();
  let versionsArr = utools.dbStorage.getItem("versions");
  const versions = new Set(versionsArr);
  if (versions.has(version)) {
    return;
  }
  versions.add(version);
  utools.dbStorage.setItem("versions", Array.from(versions));
  utools.showMessageBox({
    type: "none",
    title: "提示",
    message: `    重大更新！
    从此版起，《词典》和《Translate》两插件将合并为《翻译》（作者HaleShaw）。两者功能都将保留，且合并加强。
    1.添加多API支持，可以随意切换配置API；
    2.添加列表模式，完美模拟原生列表模式，支持点击、回车、快捷键选中复制；
    3.保留旧版页面模式，清晰查看翻译结果；
    4.新的有道API和百度API，需要自行到对应的开发者平台官网申请应用ID和密钥；
    5.内置有道移动版API为非列表模式，其他都为列表模式；
    6.内置有道旧API为有道官方已弃用API，可免费使用。但请求频率太高，容易被暂时封禁；
    7.内置有道移动版API为手机网页版解析而来，此版API原生官方支持精度相对较低，对查询精准度要求较高者可考虑使用其他API。`,
  });
  utools.redirect("翻译设置");
});

utools.onPluginEnter(({ code, type, payload }) => {
  utools.setExpendHeight(0);
  if (code == "translate_text") {
    utools.setSubInput(({ text }) => {
      delayLookUp(delayTime, text);
    }, "请输入需要查询的中英文内容");
    if (type == "over" || type == "regex") {
      utools.setSubInputValue(payload);
    }
  } else if (code == "translate_setting") {
    utools.subInputBlur();
    $("#root").addClass("hide");
    $("#setting").removeClass("hide");
    initSetting();
  }
});

/**
 * 延迟查询，避免频繁调用API.
 * @param {Number} timeout 延时查询的毫秒数.
 * @param {String} word 所查询的内容.
 */
function delayLookUp(timeout, word) {
  let contentFather = $("#root>.list").children(":first");
  word = word.trim();
  if (word == "") {
    contentFather.html("");
    $("#page").html("");
    utools.setExpendHeight(0);
    return;
  }
  timeout = typeof timeout == "number" ? timeout : delayTime;

  delayId && clearTimeout(delayId);
  delayId = setTimeout(() => {
    try {
      switchApi(word);
    } catch (error) {
      console.error(error);
    }
  }, timeout);
}

async function switchApi(word) {
  let option = utools.dbStorage.getItem("option");
  if (!option || option.error) {
    option = Object.keys(options)[0];
    utools.dbStorage.setItem("option", option);
  }

  if (option == Object.keys(options)[1]) {
    $("#root").addClass("hide");
    $("#page").removeClass("hide");
    await lookupYouDaoWap(word);
  } else if (
    option == Object.keys(options)[0] ||
    option == Object.keys(options)[2] ||
    option == Object.keys(options)[3]
  ) {
    $("#page").addClass("hide");
    $("#root").removeClass("hide");
    bindHotkey();
    let data = [];
    switch (option) {
      case Object.keys(options)[0]:
        data = await lookupYouDaoOld(word);
        break;
      case Object.keys(options)[2]:
        data = await lookupYouDao(word);
        break;
      case Object.keys(options)[3]:
        data = await lookupBaiDu(word);
        break;
      default:
        break;
    }
    initList(data);
  }
}

function bindHotkey() {
  Mousetrap.bind("down", () => {
    moveDown();
  });
  Mousetrap.bind("up", () => {
    moveUp();
  });
  Mousetrap.bind("enter", () => {
    enter();
  });
  Mousetrap.bind("alt+1", () => {
    copyItemContent(0);
  });
  Mousetrap.bind("alt+2", () => {
    copyItemContent(1);
  });
  Mousetrap.bind("alt+3", () => {
    copyItemContent(2);
  });
  Mousetrap.bind("alt+4", () => {
    copyItemContent(3);
  });
  Mousetrap.bind("alt+5", () => {
    copyItemContent(4);
  });
  Mousetrap.bind("alt+6", () => {
    copyItemContent(5);
  });
  Mousetrap.bind("alt+7", () => {
    copyItemContent(6);
  });
  Mousetrap.bind("alt+8", () => {
    copyItemContent(7);
  });
  Mousetrap.bind("alt+9", () => {
    copyItemContent(8);
  });
  Mousetrap.bind("alt+0", () => {
    copyItemContent(9);
  });
}

function initList(data) {
  let contentFather = $("#root>.list").children(":first");
  contentFather.html("");
  for (let i = 0; i < data.length; i++) {
    let item = $(`
    <div class="list-item">
      <div class="list-item-icon">
        <img src="./logo.png"/>
      </div>
      <div class="list-item-content">
        <div class="list-item-title">${data[i].title}</div>
        <div class="list-item-description">${data[i].description}</div>
      </div>
    </div>`);
    contentFather.append(item);
  }
  let height = data.length * 48;
  utools.setExpendHeight(height);
  if (data.length == 0) {
    return;
  }
  defaultItem = $("#root>.list").children(":first").children(":first");
  defaultItem.focus();
  defaultItem.addClass("selected");
  let phonetics = defaultItem[0].querySelectorAll("button.phonetic");
  if (phonetics.length != 0) {
    for (let k = 0; k < phonetics.length; k++) {
      $(phonetics[k]).addClass("selected");
    }
  }

  let list = $("#root>.list").children(":first").children();
  for (let i = 0; i < list.length; i++) {
    $(list[i]).mouseover(function () {
      for (let j = 0; j < list.length; j++) {
        $(list[j]).removeClass("selected");
      }
      $(list[i]).addClass("selected");
      $(list[i]).focus();
      defaultItem = $(list[i]);
      updatePhonetic(defaultItem[0]);
    });

    $(list[i]).click(function (e) {
      copyExit(list[i]);
    });
  }

  addPhoneticListener();
}

/**
 * 复制选中行的内容并退出。
 * @param {Object} ele 选中的行DOM元素。
 */
function copyExit(ele) {
  let content = "";
  const tran = ele.querySelector("div.list-item-title>span.translation");
  if (tran) {
    content = tran.textContent;
  } else {
    content = ele.querySelector("div.list-item-title").textContent;
  }
  utools.copyText(content.trim());
  utools.outPlugin();
  utools.hideMainWindow();
}

function moveDown() {
  defaultItem.removeClass("selected");
  defaultItem = defaultItem.next();
  if (defaultItem.length == 0) {
    defaultItem = $($(".list-item")[0]);
  }
  if (defaultItem) {
    let list = $("#root>.list").children(":first").children();
    for (let i = 0; i < list.length; i++) {
      $(list[i]).removeClass("selected");
    }
    defaultItem.addClass("selected");
    defaultItem.focus();
  }

  updatePhonetic(defaultItem[0]);
}

function moveUp() {
  defaultItem.removeClass("selected");
  defaultItem = defaultItem.prev();
  if (defaultItem.length == 0) {
    defaultItem = $($(".list-item")[$(".list-item").length - 1]);
  }
  if (defaultItem) {
    let list = $("#root>.list").children(":first").children();
    for (let i = 0; i < list.length; i++) {
      $(list[i]).removeClass("selected");
    }
    defaultItem.addClass("selected");
    defaultItem.focus();
  }

  updatePhonetic(defaultItem[0]);
}

function enter() {
  let list = $("#root>.list").children(":first").children();
  if (list.length == 0) {
    return;
  }
  for (let i = 0; i < list.length; i++) {
    const className = list[i].className;
    if (className.indexOf("selected") != -1) {
      copyExit(list[i]);
      break;
    }
  }
}

/**
 * 当按下Alt+数字时，自动复制对应行的内容，并退出。
 * @param {Number} id 列表的序号。
 * @returns
 */
function copyItemContent(id) {
  let list = document.getElementsByClassName("list-item");
  if (!list || list.length == 0 || !list[id]) {
    return;
  }

  copyExit(list[id]);
}

function updatePhonetic(ele) {
  let phonetics = ele.querySelectorAll("button.phonetic");
  if (phonetics.length != 0) {
    for (let k = 0; k < phonetics.length; k++) {
      $(phonetics[k]).addClass("selected");
    }
  } else {
    phonetics = $("button.phonetic");
    for (let k = 0; k < phonetics.length; k++) {
      $(phonetics[k]).removeClass("selected");
    }
  }
}

/**
 * 为音标添加鼠标悬浮事件。
 * 当鼠标悬浮在音标上时，自动播放读音。
 */
function addPhoneticListener() {
  let phonetics = $(".phonetic");
  if (phonetics.length == 0) {
    return;
  }
  for (let i = 0; i < phonetics.length; i++) {
    $(phonetics[i]).mouseover(function () {
      phonetics[i].children[0].play();
    });
  }
}
