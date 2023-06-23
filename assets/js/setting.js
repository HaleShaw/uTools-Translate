const options = {
  youDaoOld: {
    name: "内置有道",
    api: "http://fanyi.youdao.com/openapi.do?keyfrom=WoxLauncher&key=1247918016&type=data&doctype=json&version=1.1&q=",
  },
  youDaoWap: {
    name: "有道移动版",
    api: "https://m.youdao.com/dict?le=eng&q=",
  },
  youDaoFree: {
    name: "有道免费版",
    api: "http://fanyi.youdao.com/translate?doctype=json&type=",
    langs: {
      自动: "AUTO",
      中文: "ZH_CN",
      英语: "EN",
      韩语: "KR",
      日语: "JA",
    },
  },
  googleAPI: {
    name: "谷歌",
    api: "https://translate.googleapis.com/translate_a/single?client=gtx&ie=UTF-8&oe=UTF-8&dt=bd&dt=t&sl=auto",
  },
  google: {
    name: "谷歌",
    api: "translate.google.com",
    path: "/_/TranslateWebserverUi/data/batchexecute",
  },
  bing: {
    name: "必应",
    api: "http://cn.bing.com/dict/search?q=",
  },
  deepL: {
    name: "DeepL",
    api: "https://www2.deepl.com/jsonrpc?method=LMT_handle_jobs",
  },
  deepLFree: {
    name: "DeepL Free",
    api: "https://api-free.deepl.com/v2/translate",
  },
  deepLPro: {
    name: "DeepL Pro",
    api: "https://api.deepl.com/v2/translate",
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
    langs: {
      自动: "auto",
      英语: "en",
      中文: "zh",
      阿布哈兹语: "ab",
      阿尔巴尼亚语: "sq",
      阿肯语: "ak",
      阿拉伯语: "ar",
      阿拉贡语: "an",
      阿姆哈拉语: "am",
      阿萨姆语: "as",
      阿塞拜疆语: "az",
      阿斯图里亚斯语: "ast",
      阿兹特克语: "nch",
      埃维语: "ee",
      艾马拉语: "ay",
      爱尔兰语: "ga",
      爱沙尼亚语: "et",
      奥杰布瓦语: "oj",
      奥克语: "oc",
      奥里亚语: "or",
      奥罗莫语: "om",
      奥塞梯语: "os",
      巴布亚皮钦语: "tpi",
      巴什基尔语: "ba",
      巴斯克语: "eu",
      白俄罗斯语: "be",
      柏柏尔语: "ber",
      班巴拉语: "bm",
      邦阿西楠语: "pag",
      保加利亚语: "bg",
      北萨米语: "se",
      本巴语: "bem",
      比林语: "byn",
      比斯拉马语: "bi",
      俾路支语: "bal",
      冰岛语: "is",
      波兰语: "pl",
      波斯尼亚语: "bs",
      波斯语: "fa",
      博杰普尔语: "bho",
      布列塔尼语: "br",
      查莫罗语: "ch",
      查瓦卡诺语: "cbk",
      楚瓦什语: "cv",
      聪加语: "ts",
      鞑靼语: "tt",
      丹麦语: "da",
      掸语: "shn",
      德顿语: "tet",
      德语: "de",
      低地德语: "nds",
      低地苏格兰语: "sco",
      迪维西语: "dv",
      侗语: "kdx",
      杜順語: "dtp",
      俄语: "ru",
      法罗语: "fo",
      法语: "fr",
      梵语: "sa",
      菲律宾语: "fil",
      斐济语: "fj",
      芬兰语: "fi",
      弗留利语: "fur",
      富尔语: "fvr",
      刚果语: "kg",
      高棉语: "km",
      格雷罗纳瓦特尔语: "ngu",
      格陵兰语: "kl",
      格鲁吉亚语: "ka",
      格罗宁根方言: "gos",
      古吉拉特语: "gu",
      瓜拉尼语: "gn",
      哈萨克语: "kk",
      海地克里奥尔语: "ht",
      韩语: "ko",
      豪萨语: "ha",
      荷兰语: "nl",
      黑山语: "cnr",
      胡帕语: "hup",
      基里巴斯语: "gil",
      基隆迪语: "rn",
      基切语: "quc",
      吉尔吉斯斯坦语: "ky",
      加利西亚语: "gl",
      加泰罗尼亚语: "ca",
      捷克语: "cs",
      卡拜尔语: "kab",
      卡纳达语: "kn",
      卡努里语: "kr",
      卡舒比语: "csb",
      卡西语: "kha",
      康沃尔语: "kw",
      科萨语: "xh",
      科西嘉语: "co",
      克里克语: "mus",
      克里米亚鞑靼语: "crh",
      克林贡语: "tlh",
      克罗地亚语: "hbs",
      克丘亚语: "qu",
      克什米尔语: "ks",
      库尔德语: "ku",
      拉丁语: "la",
      拉特加莱语: "ltg",
      拉脱维亚语: "lv",
      老挝语: "lo",
      立陶宛语: "lt",
      林堡语: "li",
      林加拉语: "ln",
      卢干达语: "lg",
      卢森堡语: "lb",
      卢森尼亚语: "rue",
      卢旺达语: "rw",
      罗马尼亚语: "ro",
      罗曼什语: "rm",
      罗姆语: "rom",
      逻辑语: "jbo",
      马达加斯加语: "mg",
      马恩语: "gv",
      马耳他语: "mt",
      马拉地语: "mr",
      马拉雅拉姆语: "ml",
      马来语: "ms",
      "马里语（俄罗斯）": "chm",
      马其顿语: "mk",
      马绍尔语: "mh",
      玛雅语: "kek",
      迈蒂利语: "mai",
      毛里求斯克里奥尔语: "mfe",
      毛利语: "mi",
      蒙古语: "mn",
      孟加拉语: "bn",
      缅甸语: "my",
      苗语: "hmn",
      姆班杜语: "umb",
      纳瓦霍语: "nv",
      南非语: "af",
      尼泊尔语: "ne",
      纽埃语: "niu",
      挪威语: "no",
      帕姆语: "pmn",
      帕皮阿门托语: "pap",
      旁遮普语: "pa",
      葡萄牙语: "pt",
      普什图语: "ps",
      齐切瓦语: "ny",
      契维语: "tw",
      切罗基语: "chr",
      日语: "ja",
      瑞典语: "sv",
      萨摩亚语: "sm",
      桑戈语: "sg",
      僧伽罗语: "si",
      上索布语: "hsb",
      世界语: "eo",
      斯洛文尼亚语: "sl",
      斯瓦希里语: "sw",
      索马里语: "so",
      斯洛伐克语: "sk",
      他加禄语: "tl",
      塔吉克语: "tg",
      塔希提语: "ty",
      泰卢固语: "te",
      泰米尔语: "ta",
      泰语: "th",
      "汤加语(汤加群岛)": "to",
      "汤加语(赞比亚)": "toi",
      提格雷尼亚语: "ti",
      图瓦卢语: "tvl",
      图瓦语: "tyv",
      土耳其语: "tr",
      土库曼语: "tk",
      瓦隆语: "wa",
      "瓦瑞语(菲律宾)": "war",
      威尔士语: "cy",
      文达语: "ve",
      沃拉普克语: "vo",
      沃洛夫语: "wo",
      乌德穆尔特语: "udm",
      乌尔都语: "ur",
      乌孜别克语: "uz",
      西班牙语: "es",
      西方国际语: "ie",
      西弗里斯兰语: "fy",
      西里西亚语: "szl",
      希伯来语: "he",
      希利盖农语: "hil",
      夏威夷语: "haw",
      现代希腊语: "el",
      新共同语言: "lfn",
      信德语: "sd",
      匈牙利语: "hu",
      修纳语: "sn",
      宿务语: "ceb",
      叙利亚语: "syr",
      巽他语: "su",
      亚美尼亚语: "hy",
      亚齐语: "ace",
      伊班语: "iba",
      伊博语: "ig",
      伊多语: "io",
      伊洛卡诺语: "ilo",
      伊努克提图特语: "iu",
      意大利语: "it",
      意第绪语: "yi",
      因特语: "ia",
      印地语: "hi",
      印度尼西亚语: "id",
      印古什语: "inh",
      约鲁巴语: "yo",
      越南语: "vi",
      扎扎其语: "zza",
      爪哇语: "jv",
      中文繁体: "zh-tw",
      中文粤语: "yue",
      祖鲁语: "zu",
    },
  },
  tencent: {
    name: "腾讯",
    api: "tmt.tencentcloudapi.com",
  },
  huoShan: {
    name: "火山",
    api: "open.volcengineapi.com",
    action: "TranslateText",
    version: "2020-06-01",
    region: "cn-north-1",
    service: "translate",
  },
  caiYun: {
    name: "彩云小译",
    api: "http://api.interpreter.caiyunai.com/v1/translator",
  },
  xiaoNiu: {
    name: "小牛",
    api: "https://api.niutrans.com/NiuTransServer/translation",
  },
};

// Set the default API.
const defaultAPI = Object.keys(options)[2];

const DEFAULT_SPEAK = {
  speakSwitch: true,
  speakEngine: "Google",
  speakContent: "Source",
};
const DEFAULT_VARIABLE = {
  variableSwitch: false,
  variableContent: "Result",
  variableCase: "camelCase",
};

const DEFAULT_PROXY = {
  proxySwitch: false,
  proxyHost: "",
  proxyPort: "",
};

const BADGE_TOAST = {
  内置: "内置免费API，无需配置",
  列表: "列表模式，快速复制",
  页面: "页面模式，显示更多内容",
  多语言: "支持多种语言互译",
};

const SPEAK_ENGINE = {
  YouDao: "https://dict.youdao.com/dictvoice?audio=",
  Google: "https://translate.googleapis.com/translate_tts?ie=UTF-8&client=gtx&tl=",
};

// 设置窗口的高度。
const SETTING_HEIGHT = 544;

// 是否在完整退出插件后第一次进入。
let isFirstEnter = true;

function initSetting() {
  utools.setExpendHeight(SETTING_HEIGHT);
  loadConfiguration();
  if (isFirstEnter) {
    addSpeakListener();
    addVariableListener();
    addProxyListener();
    addApiListener();
    addSiteListener();
    addKeyPasswordListener();
    addEyeListener();
    addLangListener();
    addExchangeListener();
    addBadgeListener();
  }
  isFirstEnter && (isFirstEnter = false);
}

function loadConfiguration() {
  let option = utools.dbStorage.getItem("option");
  let radios = document.querySelectorAll("input[name=service]");

  if (!option || option.error || Object.keys(options).indexOf(option) == -1) {
    // Choose the default API.
    option = defaultAPI;
    utools.dbStorage.setItem("option", option);
  }
  for (let i = 0; i < radios.length; i++) {
    if (radios[i].value == option) {
      radios[i].checked = true;
      break;
    }
  }

  loadVersion();
  loadSpeak();
  loadVariable();
  loadProxy();
  loadIdSecret();
  loadLang();
}

/**
 * Load the version of the plugin.
 */
function loadVersion() {
  $("#pluginVersion").text(window.getVersion());
}

function loadIdSecret() {
  let deepLFreeSecret = utools.dbStorage.getItem("deepLFreeSecret");
  if (deepLFreeSecret) {
    document.getElementById("deepLFreeSecret").value = deepLFreeSecret;
  }

  let deepLProSecret = utools.dbStorage.getItem("deepLProSecret");
  if (deepLProSecret) {
    document.getElementById("deepLProSecret").value = deepLProSecret;
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

  let huoShanAppId = utools.dbStorage.getItem("huoShanAppId");
  if (huoShanAppId) {
    document.getElementById("huoShanAppId").value = huoShanAppId;
  }

  let huoShanAppSecret = utools.dbStorage.getItem("huoShanAppSecret");
  if (huoShanAppSecret) {
    document.getElementById("huoShanAppSecret").value = huoShanAppSecret;
  }

  let caiYunToken = utools.dbStorage.getItem("caiYunToken");
  if (caiYunToken) {
    document.getElementById("caiYunToken").value = caiYunToken;
  }

  let xiaoNiuToken = utools.dbStorage.getItem("xiaoNiuToken");
  if (xiaoNiuToken) {
    document.getElementById("xiaoNiuToken").value = xiaoNiuToken;
  }
}

/**
 * Load the configuration of speak.
 */
function loadSpeak() {
  speak = utools.dbStorage.getItem("speak");
  if (speak === null || typeof speak == "boolean") {
    // Choose the default speak setting.
    speak = DEFAULT_SPEAK;
    utools.dbStorage.setItem("speak", speak);
  }

  let speakSwitch = document.getElementById("funcSwitchSpeak");
  speakSwitch.checked = speak["speakSwitch"];

  let speakEngineGoogle = document.getElementById("speakEngineRadioGoogle");
  let speakEngineYouDao = document.getElementById("speakEngineRadioYouDao");
  const speakEngine = speak["speakEngine"];
  if ("Google" == speakEngine) {
    speakEngineGoogle.setAttribute("checked", true);
  } else if ("YouDao" == speakEngine) {
    speakEngineYouDao.setAttribute("checked", true);
  }

  let speakContentSource = document.getElementById("speakContentRadioSource");
  let speakContentResult = document.getElementById("speakContentRadioResult");
  const speakContent = speak["speakContent"];
  if ("Source" == speakContent) {
    speakContentSource.setAttribute("checked", true);
  } else if ("Result" == speakContent) {
    speakContentResult.setAttribute("checked", true);
  }

  updateSpeakStatus(speak["speakSwitch"]);
}

/**
 * Load the configuration of variable.
 */
function loadVariable() {
  variable = utools.dbStorage.getItem("variable");
  if (variable === null || typeof variable == "boolean") {
    // Choose the default variable setting.
    variable = DEFAULT_VARIABLE;
    utools.dbStorage.setItem("variable", variable);
  }

  let variableSwitch = document.getElementById("funcSwitchVariable");
  variableSwitch.checked = variable["variableSwitch"];

  let variableContentResult = document.getElementById("variableRadioResult");
  let variableContentSource = document.getElementById("variableRadioSource");
  const variableContent = variable["variableContent"];
  if ("Result" == variableContent) {
    variableContentResult.setAttribute("checked", true);
  } else if ("Source" == variableContent) {
    variableContentSource.setAttribute("checked", true);
  }

  const variableCase = variable["variableCase"];
  $("#variableSelect").val(variableCase);

  updateVariableStatus(variable["variableSwitch"]);
}

/**
 * Load the configuration of proxy.
 */
function loadProxy() {
  proxy = utools.dbStorage.getItem("proxy");
  if (proxy === null) {
    // Choose the default proxy setting.
    proxy = DEFAULT_PROXY;
    utools.dbStorage.setItem("proxy", proxy);
  }

  let proxySwitch = document.getElementById("funcSwitchProxy");
  proxySwitch.checked = proxy["proxySwitch"];

  let proxyHost = utools.dbStorage.getItem("proxyHost");
  if (proxyHost || "" == proxyHost) {
    proxy["proxyHost"] = proxyHost;
    utools.dbStorage.setItem("proxy", proxy);
    utools.dbStorage.removeItem("proxyHost");
  }
  let proxyPort = utools.dbStorage.getItem("proxyPort");
  if (proxyPort || "" == proxyPort) {
    proxy["proxyPort"] = proxyPort;
    utools.dbStorage.setItem("proxy", proxy);
    utools.dbStorage.removeItem("proxyPort");
  }
  document.getElementById("proxyHost").value = proxy["proxyHost"];
  document.getElementById("proxyPort").value = proxy["proxyPort"];
  updateProxyStatus(proxy["proxySwitch"]);
}

function loadLang() {
  loadLangAliYun();
  loadLangYouDaoFree();
}

function loadLangAliYun() {
  let aliYunSource = utools.dbStorage.getItem("aliYunSource") || "auto";
  let aliYunTarget = utools.dbStorage.getItem("aliYunTarget") || "auto";
  utools.dbStorage.setItem("aliYunSource", aliYunSource);
  utools.dbStorage.setItem("aliYunTarget", aliYunTarget);
  let names = Object.keys(options.aliYun.langs);
  let htmlStr = "";
  for (let i = 0; i < names.length; i++) {
    htmlStr += `<option value=${options.aliYun.langs[names[i]]}>${names[i]}</option>`;
  }
  let sourceElement = document.querySelector(".service.aliYun .lang>select.source");
  let targetElement = document.querySelector(".service.aliYun .lang>select.target");
  sourceElement.innerHTML = htmlStr;
  targetElement.innerHTML = htmlStr;
  for (let i = 0; i < sourceElement.length; i++) {
    if (aliYunSource == sourceElement.options[i].value) {
      sourceElement.options[i].selected = true;
      break;
    }
  }
  for (let i = 0; i < targetElement.length; i++) {
    if (aliYunTarget == targetElement.options[i].value) {
      targetElement.options[i].selected = true;
      break;
    }
  }
}

function loadLangYouDaoFree() {
  let youDaoFreeSource = utools.dbStorage.getItem("youDaoFreeSource") || "AUTO";
  let youDaoFreeTarget = utools.dbStorage.getItem("youDaoFreeTarget") || "AUTO";
  utools.dbStorage.setItem("youDaoFreeSource", youDaoFreeSource);
  utools.dbStorage.setItem("youDaoFreeTarget", youDaoFreeTarget);
  let names = Object.keys(options.youDaoFree.langs);
  let htmlStr = "";
  for (let i = 0; i < names.length; i++) {
    htmlStr += `<option value=${options.youDaoFree.langs[names[i]]}>${names[i]}</option>`;
  }
  let sourceElement = document.querySelector(".service.youDaoFree .lang>select.source");
  let targetElement = document.querySelector(".service.youDaoFree .lang>select.target");
  sourceElement.innerHTML = htmlStr;
  targetElement.innerHTML = htmlStr;
  for (let i = 0; i < sourceElement.length; i++) {
    if (youDaoFreeSource == sourceElement.options[i].value) {
      sourceElement.options[i].selected = true;
      break;
    }
  }
  for (let i = 0; i < targetElement.length; i++) {
    if (youDaoFreeTarget == targetElement.options[i].value) {
      targetElement.options[i].selected = true;
      break;
    }
  }
}

/**
 * Update the status of the radios of speak.
 * @param {Boolean} speakSwitch speakSwitch.
 */
function updateSpeakStatus(speakSwitch) {
  let radios = document.querySelectorAll("#speak > div.content input");
  for (let i = 0; i < radios.length; i++) {
    radios[i].disabled = !speakSwitch;
  }
}

/**
 * Update the status of the radios of variable.
 * @param {Boolean} variableSwitch variableSwitch.
 */
function updateVariableStatus(variableSwitch) {
  document.getElementById("variableRadioResult").disabled = !variableSwitch;
  document.getElementById("variableSelect").disabled = !variableSwitch;
}

/**
 * Update the status of the radios of proxy.
 * @param {Boolean} proxySwitch proxySwitch.
 */
function updateProxyStatus(proxySwitch) {
  document.getElementById("proxyHost").disabled = !proxySwitch;
  document.getElementById("proxyPort").disabled = !proxySwitch;
}

/**
 * Add the speak button listener.
 */
function addSpeakListener() {
  $("#funcSwitchSpeak").click(function () {
    let speakSwitch = !speak["speakSwitch"];
    speak["speakSwitch"] = speakSwitch;
    utools.dbStorage.setItem("speak", speak);
    updateSpeakStatus(speakSwitch);
    let speakStatus = speakSwitch ? "打开" : "关闭";
    utools.showNotification(`朗读已${speakStatus}！`);
  });

  $("input[type=radio][name=speakEngineRadio]").change(function () {
    speak["speakEngine"] = this.value;
    utools.dbStorage.setItem("speak", speak);
  });

  $("input[type=radio][name=speakContentRadio]").change(function () {
    speak["speakContent"] = this.value;
    utools.dbStorage.setItem("speak", speak);
  });
}

/**
 * Add the variable mode listener.
 */
function addVariableListener() {
  $("#funcSwitchVariable").click(function () {
    let variable = utools.dbStorage.getItem("variable");
    let variableSwitch = !variable["variableSwitch"];
    variable["variableSwitch"] = variableSwitch;
    utools.dbStorage.setItem("variable", variable);
    updateVariableStatus(variableSwitch);
    let variableStatus = variableSwitch ? "打开" : "关闭";
    utools.showNotification(`变量模式已${variableStatus}！`);
  });

  $("input[type=radio][name=variableRadio]").change(function () {
    let variable = utools.dbStorage.getItem("variable");
    variable["variableContent"] = this.value;
    utools.dbStorage.setItem("variable", variable);
  });

  const variableSelect = document.getElementById("variableSelect");
  variableSelect.addEventListener("change", e => {
    let variable = utools.dbStorage.getItem("variable");
    const { value } = e.target;
    variable["variableCase"] = value;
    utools.dbStorage.setItem("variable", variable);
  });
}

/**
 * Add the proxy mode listener.
 */
function addProxyListener() {
  let proxy = utools.dbStorage.getItem("proxy");

  $("#funcSwitchProxy").click(function () {
    let proxySwitch = !proxy["proxySwitch"];
    proxy["proxySwitch"] = proxySwitch;
    utools.dbStorage.setItem("proxy", proxy);
    updateProxyStatus(proxySwitch);
    let proxyStatus = proxySwitch ? "打开" : "关闭";
    utools.showNotification(`代理已${proxyStatus}！`);
  });

  $("#proxyHost").blur(function () {
    let proxy = utools.dbStorage.getItem("proxy");
    proxy["proxyHost"] = this.value.trim();
    utools.dbStorage.setItem("proxy", proxy);
  });

  $("#proxyPort").blur(function () {
    let proxy = utools.dbStorage.getItem("proxy");
    proxy["proxyPort"] = this.value.trim();
    utools.dbStorage.setItem("proxy", proxy);
  });
}

function addApiListener() {
  $("input[type=radio][name=service]").change(function () {
    utools.dbStorage.setItem("option", this.value);
    utools.showNotification(`翻译引擎切换至${options[this.value]["name"]}！`);
  });
}

function addSiteListener() {
  $("a.site").each((index, element) => {
    $(element).on("click", () => {
      const url = $(element).attr("href");
      utools.shellOpenExternal(url);
    });
  });
}

function addKeyPasswordListener() {
  $("#deepLFreeSecret").blur(function () {
    utools.dbStorage.setItem("deepLFreeSecret", this.value.trim());
  });
  $("#deepLProSecret").blur(function () {
    utools.dbStorage.setItem("deepLProSecret", this.value.trim());
  });
  $("#youDaoAppId").blur(function () {
    utools.dbStorage.setItem("youDaoAppId", this.value.trim());
  });
  $("#youDaoAppSecret").blur(function () {
    utools.dbStorage.setItem("youDaoAppSecret", this.value.trim());
  });
  $("#baiDuAppId").blur(function () {
    utools.dbStorage.setItem("baiDuAppId", this.value.trim());
  });
  $("#baiDuAppSecret").blur(function () {
    utools.dbStorage.setItem("baiDuAppSecret", this.value.trim());
  });
  $("#aliYunAppId").blur(function () {
    utools.dbStorage.setItem("aliYunAppId", this.value.trim());
  });
  $("#aliYunAppSecret").blur(function () {
    utools.dbStorage.setItem("aliYunAppSecret", this.value.trim());
  });
  $("#tencentAppId").blur(function () {
    utools.dbStorage.setItem("tencentAppId", this.value.trim());
  });
  $("#tencentAppSecret").blur(function () {
    utools.dbStorage.setItem("tencentAppSecret", this.value.trim());
  });
  $("#huoShanAppId").blur(function () {
    utools.dbStorage.setItem("huoShanAppId", this.value.trim());
  });
  $("#huoShanAppSecret").blur(function () {
    utools.dbStorage.setItem("huoShanAppSecret", this.value.trim());
  });
  $("#caiYunToken").blur(function () {
    utools.dbStorage.setItem("caiYunToken", this.value.trim());
  });
  $("#xiaoNiuToken").blur(function () {
    utools.dbStorage.setItem("xiaoNiuToken", this.value.trim());
  });
}

function addEyeListener() {
  $(".eye").each(function () {
    $(this).click(function (e) {
      const className = $(this).attr("class");
      if (className.indexOf("closed") != -1) {
        $(this).removeClass("closed");
        $(this).addClass("opened");
        $(this).prev().attr("type", "text");
      } else if (className.indexOf("opened") != -1) {
        $(this).removeClass("opened");
        $(this).addClass("closed");
        $(this).prev().attr("type", "password");
      }
    });
  });
}

function addLangListener() {
  addLangListenerAliYun();
  addLangListenerYouDaoFree();
}

function addLangListenerAliYun() {
  $(".service.aliYun .lang>select.source").change(function () {
    changeBrotherAliYun($(this).val(), $(".service.aliYun .lang>select.target"));
    utools.dbStorage.setItem("aliYunSource", $(this).val());
    let targetValue = $(".service.aliYun .lang>select.target").val();
    utools.dbStorage.setItem("aliYunTarget", targetValue);
  });
  $(".service.aliYun .lang>select.target").change(function () {
    changeBrotherAliYun($(this).val(), $(".service.aliYun .lang>select.source"));
    utools.dbStorage.setItem("aliYunTarget", $(this).val());
    let sourceValue = $(".service.aliYun .lang>select.source").val();
    utools.dbStorage.setItem("aliYunSource", sourceValue);
  });
}

/**
 * Change the value of the brother select element for AliYun.
 * @param {String} thisValue The value of the current select element.
 * @param {Object} brother The brother jquery object of the current select element.
 */
function changeBrotherAliYun(thisValue, brother) {
  let brotherValue = brother.val();
  if ("mn" == thisValue || "yue" == thisValue || "zh-tw" == thisValue) {
    brother[0].selectedIndex = 2;
  } else if ("auto" != brotherValue && thisValue == brotherValue) {
    if ("en" == thisValue) {
      brother[0].selectedIndex = 2;
    } else if ("zh" == thisValue) {
      brother[0].selectedIndex = 1;
    }
  }
}

function addLangListenerYouDaoFree() {
  $(".service.youDaoFree .lang>select.source").change(function () {
    changeBrotherYouDaoFree($(this).val(), $(".service.youDaoFree .lang>select.target"));
    utools.dbStorage.setItem("youDaoFreeSource", $(this).val());
    let youDaoFreeTarget = $(".service.youDaoFree .lang>select.target").val();
    utools.dbStorage.setItem("youDaoFreeTarget", youDaoFreeTarget);
  });
  $(".service.youDaoFree .lang>select.target").change(function () {
    changeBrotherYouDaoFree($(this).val(), $(".service.youDaoFree .lang>select.source"));
    utools.dbStorage.setItem("youDaoFreeTarget", $(this).val());
    let youDaoFreeSource = $(".service.youDaoFree .lang>select.source").val();
    utools.dbStorage.setItem("youDaoFreeSource", youDaoFreeSource);
  });
}

/**
 * Change the value of the brother select element for YouDaoFree.
 * @param {String} thisValue The value of the current select element.
 * @param {Object} brother The brother jquery object of the current select element.
 */
function changeBrotherYouDaoFree(thisValue, brother) {
  switch (thisValue) {
    case "AUTO":
      brother[0].selectedIndex = 0;
      break;
    case "ZH_CN":
      brother[0].selectedIndex = 2;
      break;
    case "EN":
    case "KR":
    case "JA":
      brother[0].selectedIndex = 1;
      break;
    default:
      break;
  }
}

/**
 * Add the exchange button listener.
 */
function addExchangeListener() {
  $(".service.youDaoFree .lang>.exchange").click(function () {
    let sourceEle = $(".service.youDaoFree .lang>select.source");
    let targetEle = $(".service.youDaoFree .lang>select.target");
    let temp = sourceEle[0].selectedIndex;
    sourceEle[0].selectedIndex = targetEle[0].selectedIndex;
    targetEle[0].selectedIndex = temp;
  });

  $(".service.aliYun .lang>.exchange").click(function () {
    let sourceEle = $(".service.aliYun .lang>select.source");
    let targetEle = $(".service.aliYun .lang>select.target");
    let temp = sourceEle[0].selectedIndex;
    sourceEle[0].selectedIndex = targetEle[0].selectedIndex;
    targetEle[0].selectedIndex = temp;
  });
}

/**
 * When the mouse moves to the badge, display the tooltip.
 */
function addBadgeListener() {
  $("#setting")
    .find(".badge")
    .mouseover(function () {
      $("#tooltip").text(BADGE_TOAST[this.textContent]);
      $("#tooltip")
        .css({
          padding: "5px",
          top: $(this).offset().top - 5,
          left: $(this).offset().left + $(this).outerWidth() + 5,
          position: "absolute",
          color: "white",
          background: "#292a2d",
          border: "1px solid #cfd1d4",
        })
        .show();
    })
    .mouseout(function () {
      $("#tooltip").hide();
    });
}
