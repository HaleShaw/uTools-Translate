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

/**
 * 检查当前操作系统类型，并根据操作系统更新快捷键显示内容。
 * 对于 macOS 系统，使用 ⌘ 作为部分快捷键的修饰符，Ctrl 作为朗读快捷键的修饰符；
 * 对于其他系统，使用 Alt 作为所有快捷键的修饰符。
 */
function checkSystem() {
  const isMac = utools.isMacOS();
  const listModifier = isMac ? "⌘" : "Alt";
  const speakModifier = isMac ? "Ctrl" : "Alt";

  // 缓存DOM元素引用
  const quickIndexEl = document.querySelector(".quick-index-identity");
  const shortcutEnEl = document.getElementById("shortcutEn");
  const shortcutUsEl = document.getElementById("shortcutUs");

  // 生成数字快捷键列表
  const shortcutNumbers = Array.from({ length: 10 }, (_, i) =>
    `<div>${listModifier}+${i === 9 ? 0 : i + 1}</div>`
  ).join("");

  /**
   * 生成快捷键的 HTML 字符串。
   * @param {string} modifier - 快捷键的修饰符，如 ⌘、Ctrl 或 Alt。
   * @param {string} key - 快捷键的按键，如 S、D。
   * @returns {string} - 包含快捷键信息的 HTML 字符串。
   */
  const createShortcutHTML = (modifier, key) =>
    `<span class="key">${modifier}</span>+<span class="key">${key}</span>`;

  // 更新DOM内容
  quickIndexEl.innerHTML = shortcutNumbers;
  shortcutEnEl.innerHTML = createShortcutHTML(speakModifier, "S");
  shortcutUsEl.innerHTML = createShortcutHTML(speakModifier, "D");
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
    option == Object.keys(options)[24] ||
    option == Object.keys(options)[25]
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
      case Object.keys(options)[25]:
        data = await lookupOpenAI(word);
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
    move("down");
  });
  Mousetrap.bind(["up", "ctrl+k", "ctrl+p"], () => {
    move("up");
  });
  Mousetrap.bind("enter", () => {
    execute();
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

/**
 * 初始化翻译结果列表。
 * @param {Array} data - 包含翻译结果的数组，每个元素是一个对象，包含 `title` 和 `description` 属性。
 * @param {string} option - 当前选择的翻译 API 选项。
 */
function initList(data, option) {
  // 缓存DOM元素引用
  const $listContainer = $("#root > .list").children(":first").empty();
  const currentOption = options[option];
  const isEmptyData = data.length === 0;

  // 生成列表项HTML模板
  const generateItemHTML = (item) => `
    <div class="list-item">
      <div class="list-item-icon">
        <img src="./logo.png"/>
        <img class="minLogo" src="./assets/images/${currentOption.logo}"/>
      </div>
      <div class="list-item-content">
        <div class="list-item-title">${item.title}</div>
        <div class="list-item-description">${item.description}</div>
      </div>
    </div>`;

  // 批量插入列表项
  $listContainer.html(data.map(generateItemHTML).join(""));

  // 设置容器高度
  const calculateHeight = () => Math.min(data.length * itemHeight, maxHeight);
  utools.setExpendHeight(isEmptyData ? 0 : calculateHeight());

  if (isEmptyData) return;

  // 初始化选中项
  const $items = $listContainer.children();
  let $defaultItem = $items.first()
    .addClass("selected")
    .focus();

  // 处理音标按钮状态
  const updatePhoneticState = (item) => {
    $(item).find("button.phonetic").addClass("selected");
  };
  updatePhoneticState($defaultItem);

  // 事件委托处理
  $listContainer
    .on("mouseover", ".list-item", function () {
      $items.removeClass("selected");
      $(this).addClass("selected").focus();
      $defaultItem = $(this);
      updatePhonetic($defaultItem[0]);
    })
    .on("click", ".list-item", (e) => copyExit(e.currentTarget));

  // 处理溢出逻辑
  const handleOverflow = (item) => {
    const $title = $(item).find(".list-item-title");
    const isOverflowing = $title[0].scrollWidth > $title[0].offsetWidth;

    if (!isOverflowing) return;

    // 如果横向显示溢出，则为元素添加title属性。
    item.title = $title.text();

    // 当横向溢出时，通常就只有一个翻译结果，此时直接将结果行展开到自适应高度。若有多个翻译结果，则不展开。
    if ($(".list-item").length !== 1) return;

    const $translation = $title.find("span.translation");
    const $parent = $(item).closest(".list-item");

    // 应用自适应样式
    $title.add($parent).css("height", "unset");
    $translation.css({
      display: "block",
      wordBreak: "normal",
      whiteSpace: "pre-wrap",
      maxHeight: "460px",
      overflowY: "scroll"
    });

    // 更新容器高度
    const newHeight = $parent[0].scrollHeight;
    $(".quick-index-identity > div:first-child").css({
      lineHeight: `${newHeight}px`,
      height: `${newHeight}px`
    });
    utools.setExpendHeight(newHeight);
  };

  // 遍历处理所有项
  $items.each((i, item) => handleOverflow(item));

  // 为音标按钮添加鼠标悬浮事件监听器
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
  utools.copyText(getContent(ele.querySelector("div.list-item-title")));
  utools.outPlugin();
  utools.hideMainWindow();
}


function move(direction) {
  const $current = $(".list-item.selected").removeClass("selected");
  const $items = $(".list-item");

  const $target = direction === 'down'
    ? $current.next().addBack($items.first())
    : $current.prev().addBack($items.last());

  $target.addClass("selected").focus();
  updatePhonetic($target[0]);
}

function execute() {
  const $selected = $(".list-item.selected");
  $selected.length && copyExit($selected[0]);
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
  $("#root > .list").children(":first").on("mouseenter", ".phonetic", function () {
    $(this).find("audio")[0]?.play();
  });
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
