const changeCase = parcelRequire("Focm").default;

// 默认被选中的项。
var defaultItem;

// 单个列表高度。
const itemHeight = 48;

// 整个窗口最大高度。
const maxHeight = itemHeight * 10;

// 延时ID。
let delayId = null;

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
      delayLookUp(getDebouncingTime(), text, false);
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

/**
 * 推送内容到搜索框。
 */
utools.onMainPush(({ code, type, payload }) => {
  let word = payload.trim();
  if (!word || word == "") {
    return [];
  }
  return switchApi(word, true);
}, null);


/**
 * 获取防抖时间。
 * 如果防抖时间未设置或为空，则使用默认防抖时间并将其存储到数据库中。
 * @returns {Number} 防抖时间。
 */
function getDebouncingTime() {
  let debouncingTime = utools.dbStorage.getItem("debouncingTime");
  if (debouncingTime === null || "" == debouncingTime) {
    debouncingTime = DEFAULT_DEBOUNCING;
    utools.dbStorage.setItem("debouncingTime", debouncingTime);
  }
  return debouncingTime;
}

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
  document.getElementById("shortcutEn").innerHTML = `<span class="key">${speakKey}</span>+<span class="key">S</span>`;
  document.getElementById("shortcutUs").innerHTML = `<span class="key">${speakKey}</span>+<span class="key">D</span>`;
}

/**
 * 延迟查询，避免频繁调用API.
 * @param {Number} debouncingTime 延时查询的毫秒数.
 * @param {String} word 所查询的内容.
 */
function delayLookUp(debouncingTime, word) {
  let contentFather = $("#root>.list").children(":first");
  word = word.trim();
  if (word == "") {
    contentFather.html("");
    $("#page").html("");
    utools.setExpendHeight(0);
    return;
  }
  debouncingTime = typeof debouncingTime == "number" ? debouncingTime : DEFAULT_DEBOUNCING;

  delayId && clearTimeout(delayId);
  delayId = setTimeout(() => {
    try {
      switchApi(word);
    } catch (error) {
      console.error(error);
    }
  }, debouncingTime);
}

/**
 * 根据选择的 API 选项，异步调用相应的翻译 API 进行翻译操作，并处理相关配置和界面显示。
 * @param {string} word - 需要翻译的文本。
 * @param {boolean} mainPush - 指示是否从主程序推送触发的标志。
 * @returns {Array} - 如果是主程序推送触发，返回处理后的数据数组；否则不返回。
 */
async function switchApi(word, mainPush) {
  let option = utools.dbStorage.getItem("option");

  const keys = Object.keys(options);
  const firstKey = keys[0];
  const isOptionInvalid = !option || option.error || !keys.includes(option);
  const isFirstKeyPushed = option === firstKey && mainPush;

  if (isOptionInvalid || isFirstKeyPushed) {
    option = defaultAPI;

    if (!isFirstKeyPushed) {
      utools.dbStorage.setItem("option", option);
    }
  }

  speak = utools.dbStorage.getItem("speak");
  if (speak === null || typeof speak == "boolean") {
    // Choose the default speak setting.
    speak = DEFAULT_SPEAK;
    utools.dbStorage.setItem("speak", speak);
  }

  let variable = utools.dbStorage.getItem("variable");
  if (variable === null || typeof variable == "boolean") {
    // Choose the default variable setting.
    variable = DEFAULT_VARIABLE;
    utools.dbStorage.setItem("variable", variable);
    utools.dbStorage.removeItem("variableCase");
  }
  const variableSwitch = variable["variableSwitch"];
  const variableContent = variable["variableContent"];
  const variableSource = variable["variableSource"];
  if (variableSwitch && variableContent == "Source" && variableSource) {
    word = UnChangeCase(word, variableSource);
  }

  if (option == Object.keys(options)[0]) {
    $("#root").addClass("hide");
    $("#setting").addClass("hide");
    $("#page").removeClass("hide");
    bindPhoneticHotkey();
    await lookupYouDaoWap(word);
  } else if (
    option == Object.keys(options)[1] ||
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
    option == Object.keys(options)[15] ||
    option == Object.keys(options)[16] ||
    option == Object.keys(options)[17] ||
    option == Object.keys(options)[18] ||
    option == Object.keys(options)[19] ||
    option == Object.keys(options)[20] ||
    option == Object.keys(options)[21] ||
    option == Object.keys(options)[22] ||
    option == Object.keys(options)[23] ||
    option == Object.keys(options)[24]
  ) {
    $("#page").addClass("hide");
    $("#setting").addClass("hide");
    $("#root").removeClass("hide");
    bindHotkey();
    let data = [];
    switch (option) {
      case Object.keys(options)[1]:
        data = await lookupYouDaoWeb(word);
        break;
      case Object.keys(options)[2]:
        data = await lookupBaiDuFree(word);
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
        data = await lookupICiBa(word);
        break;
      case Object.keys(options)[7]:
        data = await lookupTranSmart(word);
        break;
      case Object.keys(options)[8]:
        data = await lookupMicrosoft(word);
        break;
      case Object.keys(options)[9]:
        data = await lookupFoxIT(word);
        break;
      case Object.keys(options)[10]:
        data = await lookupCNKI(word);
        break;
      case Object.keys(options)[11]:
        data = await lookupDeepL(word);
        break;
      case Object.keys(options)[12]:
        data = await lookupDeepLX(word);
        break;
      case Object.keys(options)[13]:
        data = await lookupDeepLAPI(word, "free");
        break;
      case Object.keys(options)[14]:
        data = await lookupDeepLAPI(word, "pro");
        break;
      case Object.keys(options)[15]:
        data = await lookupYouDao(word);
        break;
      case Object.keys(options)[16]:
        data = await lookupBaiDu(word);
        break;
      case Object.keys(options)[17]:
        data = await lookupAliYun(word);
        break;
      case Object.keys(options)[18]:
        data = await lookupTencent(word);
        break;
      case Object.keys(options)[19]:
        data = await lookupHuoShan(word);
        break;
      case Object.keys(options)[20]:
        data = await lookupHuaWei(word);
        break;
      case Object.keys(options)[21]:
        data = await lookupCaiYun(word);
        break;
      case Object.keys(options)[22]:
        data = await lookupXiaoNiu(word);
        break;
      case Object.keys(options)[23]:
        data = await lookupUToolsAI(word);
        break;
      case Object.keys(options)[24]:
        data = await lookupDeepSeek(word);
        break;
      default:
        break;
    }
    formatVariableCase(data);
    if (mainPush) {
      return data.map(item => {
        const textMatch = item.title.match(/<span class="translation">(.*?)<\/span>/);
        const text = textMatch ? textMatch[1] : item.title;
        return {
          title: item.description,
          icon: `./assets/images/${options[option]["logo"]}`,
          text: text
        };
      });
    }
    initList(data, option);
  }
  console.debug(option);
}

function bindHotkey() {
  Mousetrap.bind(["down", "ctrl+n", "ctrl+j"], () => {
    moveDown();
  });
  Mousetrap.bind(["up", "ctrl+k", "ctrl+p"], () => {
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
  if (utools.isMacOS()) {
    Mousetrap.bind(["ctrl+s"], () => {
      playPhonetic(0);
    });
    Mousetrap.bind(["ctrl+d"], () => {
      playPhonetic(1);
    });
  } else {
    Mousetrap.bind(["alt+s"], () => {
      playPhonetic(0);
    });
    Mousetrap.bind(["alt+d"], () => {
      playPhonetic(1);
    });
  }
}

/**
 * 将全为英文的翻译结果按照变量格式化。
 * @param {Array} data data array.
 */
function formatVariableCase(data) {
  const variable = utools.dbStorage.getItem("variable");
  const variableSwitch = variable["variableSwitch"];
  const variableResult = variable["variableResult"];
  text = data[0]["title"];
  if (variable && variableSwitch && variableResult && text) {
    const tempDom = new DOMParser().parseFromString(text, "text/html");
    let resultDom = tempDom.querySelector(".translation");
    if (!resultDom) {
      return;
    }
    translationValue = resultDom.innerText;
    if (!variableReg.test(translationValue)) {
      for (let i = variableResult.length - 1; i >= 0; i--) {
        variableItem = {
          title: changeCase[variableResult[i]](translationValue),
          description: `变量模式：${variableNameMap[variableResult[i]]}`,
        };
        data.unshift(variableItem);
      }
    }
  }
}

function initList(data, option) {
  let contentFather = $("#root>.list").children(":first");
  contentFather.html("");
  for (let i = 0; i < data.length; i++) {
    let item = $(`
    <div class="list-item">
      <div class="list-item-icon">
        <img src="./logo.png"/>
        <img class="minLogo" src="./assets/images/${options[option]["logo"]}"/>
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

      // 当横向溢出时，通常就只有一个翻译结果，此时直接将结果行展开到自适应高度。若有多个翻译结果，则不展开。
      let itemList = document.querySelectorAll("div.list-item");
      if (itemList.length != 1) {
        continue;
      }
      let spanEle = list[i].querySelector("div.list-item-title > span.translation");
      title.style.height = "unset";
      title.parentElement.parentElement.style.height = "unset";
      spanEle.style.display = "block";
      spanEle.style.wordBreak = "normal";
      spanEle.style.whiteSpace = "pre-wrap";
      spanEle.style.maxHeight = "460px";
      spanEle.style.overflowY = "scroll";
      let newHeight = title.parentElement.parentElement.scrollHeight;
      let identity = document.querySelector("div.quick-index-identity > div:nth-child(1)");
      identity.style.lineHeight = newHeight + "px";
      identity.style.height = newHeight + "px";
      utools.setExpendHeight(newHeight);
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
