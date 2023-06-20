const changeCase = parcelRequire("Focm").default;

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

// 延迟查询的时间毫秒数。
const delayTime = 300;

// 朗读配置。
var speak;

// 变量模式中，各模式方法名中英map，key不可随意更换，需要与引用包中方法名一致
const variableNameMap = {
  camelCase: "小驼峰",
  pascalCase: "大驼峰",
  snakeCase: "下划线",
  paramCase: "中横线",
  constantCase: "常量",
};

const variableReg = /[^a-zA-Z\s]/g;

utools.onPluginEnter(({ code, type, payload }) => {
  utools.setExpendHeight(0);
  checkSystem();
  if (code == "translate_text") {
    utools.setSubInput(({ text }) => {
      delayLookUp(delayTime, text);
    }, "请输入需要查询的内容");
    if (type == "over" || type == "regex") {
      utools.setSubInputValue(payload);
    }
  } else if (code == "translate_setting") {
    utools.subInputBlur();
    $("#root").addClass("hide");
    $("#page").addClass("hide");
    $("#setting").removeClass("hide");
    initSetting();
  }
});

function checkSystem() {
  let listKey = utools.isMacOS() ? "⌘" : "Alt";
  let speakKey = utools.isMacOS() ? "Ctrl" : "Alt";
  document.getElementsByClassName("quick-index-identity")[0].innerHTML = `
  <div>${listKey}+1</div>
  <div>${listKey}+2</div>
  <div>${listKey}+3</div>
  <div>${listKey}+4</div>
  <div>${listKey}+5</div>
  <div>${listKey}+6</div>
  <div>${listKey}+7</div>
  <div>${listKey}+8</div>
  <div>${listKey}+9</div>
  <div>${listKey}+0</div>`;
  document.getElementById("shortcutEn").innerHTML = `${speakKey}+S`;
  document.getElementById("shortcutUs").innerHTML = `${speakKey}+D`;
}

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
  if (!option || option.error || Object.keys(options).indexOf(option) == -1) {
    // Choose the default API.
    option = defaultAPI;
    utools.dbStorage.setItem("option", option);
  }

  speak = utools.dbStorage.getItem("speak");
  if (speak === null) {
    // Choose the default speak setting.
    speak = defaultSpeak;
    utools.dbStorage.setItem("speak", speak);
  }

  if (option == Object.keys(options)[1]) {
    $("#root").addClass("hide");
    $("#setting").addClass("hide");
    $("#page").removeClass("hide");
    bindPhoneticHotkey();
    await lookupYouDaoWap(word);
  } else if (
    option == Object.keys(options)[0] ||
    option == Object.keys(options)[2] ||
    option == Object.keys(options)[3] ||
    option == Object.keys(options)[4] ||
    option == Object.keys(options)[5] ||
    option == Object.keys(options)[6] ||
    option == Object.keys(options)[7] ||
    option == Object.keys(options)[8] ||
    option == Object.keys(options)[9] ||
    option == Object.keys(options)[10] ||
    option == Object.keys(options)[11] ||
    option == Object.keys(options)[12] ||
    option == Object.keys(options)[13] ||
    option == Object.keys(options)[14] ||
    option == Object.keys(options)[15]
  ) {
    $("#page").addClass("hide");
    $("#setting").addClass("hide");
    $("#root").removeClass("hide");
    bindHotkey();
    let data = [];
    switch (option) {
      case Object.keys(options)[0]:
        data = await lookupYouDaoOld(word);
        break;
      case Object.keys(options)[2]:
        data = await lookupYouDaoFree(word);
        break;
      case Object.keys(options)[3]:
        data = await lookupGoogleAPI(word);
        break;
      case Object.keys(options)[4]:
        data = await lookupGoogle(word);
        break;
      case Object.keys(options)[5]:
        data = await lookupBing(word);
        break;
      case Object.keys(options)[6]:
        data = await lookupDeepL(word);
        break;
      case Object.keys(options)[7]:
        data = await lookupDeepLAPI(word, "free");
        break;
      case Object.keys(options)[8]:
        data = await lookupDeepLAPI(word, "pro");
        break;
      case Object.keys(options)[9]:
        data = await lookupYouDao(word);
        break;
      case Object.keys(options)[10]:
        data = await lookupBaiDu(word);
        break;
      case Object.keys(options)[11]:
        data = await lookupAliYun(word);
        break;
      case Object.keys(options)[12]:
        data = await lookupTencent(word);
        break;
      case Object.keys(options)[13]:
        data = await lookupHuoShan(word);
        break;
      case Object.keys(options)[14]:
        data = await lookupCaiYun(word);
        break;
      case Object.keys(options)[15]:
        data = await lookupXiaoNiu(word);
        break;
      default:
        break;
    }
    initList(data);
  }
  console.debug(option);
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
  Mousetrap.bind(["alt+1", "command+1"], () => {
    copyItemContent(0);
  });
  Mousetrap.bind(["alt+2", "command+2"], () => {
    copyItemContent(1);
  });
  Mousetrap.bind(["alt+3", "command+3"], () => {
    copyItemContent(2);
  });
  Mousetrap.bind(["alt+4", "command+4"], () => {
    copyItemContent(3);
  });
  Mousetrap.bind(["alt+5", "command+5"], () => {
    copyItemContent(4);
  });
  Mousetrap.bind(["alt+6", "command+6"], () => {
    copyItemContent(5);
  });
  Mousetrap.bind(["alt+7", "command+7"], () => {
    copyItemContent(6);
  });
  Mousetrap.bind(["alt+8", "command+8"], () => {
    copyItemContent(7);
  });
  Mousetrap.bind(["alt+9", "command+9"], () => {
    copyItemContent(8);
  });
  Mousetrap.bind(["alt+0", "command+0"], () => {
    copyItemContent(9);
  });
  bindPhoneticHotkey();
}

/**
 * Bind the hotkey for reading aloud.
 */
function bindPhoneticHotkey() {
  Mousetrap.bind(["alt+s", "ctrl+s"], () => {
    playPhonetic(0);
  });
  Mousetrap.bind(["alt+d", "ctrl+d"], () => {
    playPhonetic(1);
  });
}

/**
 * 将全为英文的翻译结果按照变量格式化。
 * @param {Array} data data array.
 */
function formatVariableCase(data) {
  const dev = utools.dbStorage.getItem("variable");
  const variableCase = utools.dbStorage.getItem("variableCase");
  text = data[0]["title"];
  if (dev && variableCase && text) {
    const tempDom = new DOMParser().parseFromString(text, "text/html");
    translationValue = tempDom.querySelector(".translation").innerText;
    if (!variableReg.test(translationValue)) {
      variableValue = {
        title: changeCase[variableCase](translationValue),
        description: `变量模式：${variableNameMap[variableCase]}`,
      };
      data.unshift(variableValue);
    }
  }
}

function initList(data) {
  formatVariableCase(data);
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
  let height = data.length * itemHeight > maxHeight ? maxHeight : data.length * itemHeight;
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

    // 如果横向显示溢出，则为元素添加title属性。
    let title = list[i].querySelector("div.list-item-title");
    if (title.scrollWidth > title.offsetWidth) {
      list[i].setAttribute("title", getContent(title));
    }
  }
  addPhoneticListener();
}

/**
 * 获取选中行的内容。
 * @param {Object} ele 选中的行DOM元素下的title元素。
 */
function getContent(ele) {
  const tran = ele.querySelector("span.translation");
  return tran ? tran.textContent.trim() : ele.textContent.trim();
}

/**
 * 复制选中行的内容并退出。
 * @param {Object} ele 选中的行DOM元素。
 */
function copyExit(ele) {
  const title = ele.querySelector("div.list-item-title");
  utools.copyText(getContent(title));
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

  // When the page has scrolling, the first element in the visual window is not really the first element.
  // So we should find out the actual index.
  // The method of JavaScript is not right, we should use JQuery to get the top offset.
  // ().offsetTop has some problem.
  // $().offset().top
  let firstIndex = 0;
  for (let i = 0; i < list.length; i++) {
    if (-24 < $(list[i]).offset().top && $(list[i]).offset().top < 24) {
      firstIndex = i;
      break;
    }
  }
  let index = firstIndex + id;

  copyExit(list[index]);
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

/**
 * Play the phonetic by element index.
 * While the index is 0, then play the English phonetic.
 * While the index is 1, then play the American English phonetic.
 * @param {Number} index The phonetic element index number. 0, 1.
 */
function playPhonetic(index) {
  let phonetics = document.querySelectorAll(".phonetic>audio");
  let len = phonetics.length;
  if ((len > 0 && index == 0) || (len == 2 && index == 1)) {
    phonetics[index].play();
    return;
  }
  let pagePhonetics = document.querySelectorAll(".pageBtn>audio");
  let pageLen = pagePhonetics.length;
  if ((pageLen > 0 && index == 0) || (pageLen == 2 && index == 1)) {
    pagePhonetics[index].play();
  }
}
