const options = {
  youDaoWap: {
    name: "有道移动版",
    api: "https://m.youdao.com/dict?le=eng&q=",
    logo: "youDaoWap.png",
  },
  youDaoWeb: {
    name: "有道网页版",
    api: "dict.youdao.com",
    path: "/webtranslate",
    logo: "youDaoWeb.png",
    client: "fanyideskweb",
    product: "webfanyi",
    key: "asdjnjfenknafdfsdfsd",
  },
  baiDuFree: {
    name: "百度",
    api: "https://fanyi.baidu.com/ait/text/translate",
    logo: "baiDu.png",
  },
  googleAPI: {
    name: "谷歌",
    api: "https://translate.googleapis.com/translate_a/single?client=gtx&ie=UTF-8&oe=UTF-8&dt=bd&dt=t&sl=auto",
    langs: {
      自动: "auto",
      阿尔巴尼亚语: "sq",
      阿拉伯语: "ar",
      阿姆哈拉语: "am",
      阿萨姆语: "as",
      阿塞拜疆语: "az",
      埃维语: "ee",
      艾马拉语: "ay",
      爱尔兰语: "ga",
      爱沙尼亚语: "et",
      奥利亚语: "or",
      奥罗莫语: "om",
      巴斯克语: "eu",
      白俄罗斯语: "be",
      班巴拉语: "bm",
      保加利亚语: "bg",
      冰岛语: "is",
      波兰语: "pl",
      波斯尼亚语: "bs",
      波斯语: "fa",
      博杰普尔语: "bho",
      "布尔语(南非荷兰语)": "af",
      鞑靼语: "tt",
      丹麦语: "da",
      德语: "de",
      迪维希语: "dv",
      蒂格尼亚语: "ti",
      多格来语: "doi",
      俄语: "ru",
      法语: "fr",
      梵语: "sa",
      菲律宾语: "tl",
      芬兰语: "fi",
      弗里西语: "fy",
      高棉语: "km",
      格鲁吉亚语: "ka",
      贡根语: "gom",
      古吉拉特语: "gu",
      瓜拉尼语: "gn",
      哈萨克语: "kk",
      海地克里奥尔语: "ht",
      韩语: "ko",
      豪萨语: "ha",
      荷兰语: "nl",
      吉尔吉斯语: "ky",
      加利西亚语: "gl",
      加泰罗尼亚语: "ca",
      捷克语: "cs",
      卡纳达语: "kn",
      科西嘉语: "co",
      克里奥尔语: "kri",
      克罗地亚语: "hr",
      克丘亚语: "qu",
      "库尔德语（库尔曼吉语）": "ku",
      "库尔德语（索拉尼）": "ckb",
      拉丁语: "la",
      拉脱维亚语: "lv",
      老挝语: "lo",
      立陶宛语: "lt",
      林格拉语: "ln",
      卢干达语: "lg",
      卢森堡语: "lb",
      卢旺达语: "rw",
      罗马尼亚语: "ro",
      马尔加什语: "mg",
      马耳他语: "mt",
      马拉地语: "mr",
      马拉雅拉姆语: "ml",
      马来语: "ms",
      马其顿语: "mk",
      迈蒂利语: "mai",
      毛利语: "mi",
      "梅泰语（曼尼普尔语）": "mni-Mtei",
      蒙古语: "mn",
      孟加拉语: "bn",
      米佐语: "lus",
      缅甸语: "my",
      苗语: "hmn",
      南非科萨语: "xh",
      南非祖鲁语: "zu",
      尼泊尔语: "ne",
      挪威语: "no",
      旁遮普语: "pa",
      葡萄牙语: "pt",
      普什图语: "ps",
      齐切瓦语: "ny",
      契维语: "ak",
      日语: "ja",
      瑞典语: "sv",
      萨摩亚语: "sm",
      塞尔维亚语: "sr",
      塞佩蒂语: "nso",
      塞索托语: "st",
      僧伽罗语: "si",
      世界语: "eo",
      斯洛伐克语: "sk",
      斯洛文尼亚语: "sl",
      斯瓦希里语: "sw",
      苏格兰盖尔语: "gd",
      宿务语: "ceb",
      索马里语: "so",
      塔吉克语: "tg",
      泰卢固语: "te",
      泰米尔语: "ta",
      泰语: "th",
      土耳其语: "tr",
      土库曼语: "tk",
      威尔士语: "cy",
      维吾尔语: "ug",
      乌尔都语: "ur",
      乌克兰语: "uk",
      乌兹别克语: "uz",
      西班牙语: "es",
      希伯来语: "iw",
      希腊语: "el",
      夏威夷语: "haw",
      信德语: "sd",
      匈牙利语: "hu",
      修纳语: "sn",
      亚美尼亚语: "hy",
      伊博语: "ig",
      伊洛卡诺语: "ilo",
      意大利语: "it",
      意第绪语: "yi",
      印地语: "hi",
      印尼巽他语: "su",
      印尼语: "id",
      印尼爪哇语: "jw",
      英语: "en",
      约鲁巴语: "yo",
      越南语: "vi",
      "中文（繁体）": "zh-TW",
      "中文（简体）": "zh-CN",
      宗加语: "ts",
    },
    logo: "google.png",
  },
  google: {
    name: "谷歌",
    api: "translate.google.com",
    path: "/_/TranslateWebserverUi/data/batchexecute",
    logo: "google.png",
  },
  bing: {
    name: "必应",
    api: "http://cn.bing.com/dict/search?q=",
    logo: "bing.png",
  },
  iCiBa: {
    name: "爱词霸",
    api: "https://ifanyi.iciba.com/index.php?c=trans&m=fy&client=param_client&auth_user=param_user&sign=",
    client: "6",
    auth_user: "key_web_new_fanyi",
    dict: "6dVjYLFyzfkFkk",
    encrypt: "L4fBtD5fLC9FQw22",
    decrypt: "aahc3TfyfCEmER33",
    logo: "iCiBa.png",
  },
  tranSmart: {
    name: "腾讯",
    api: "https://transmart.qq.com/api/imt",
    langs: {
      自动: "auto",
      中文: "zh",
      英语: "en",
      阿拉伯语: "ar",
      德语: "de",
      俄语: "ru",
      法语: "fr",
      菲律宾语: "fil",
      高棉语: "km",
      韩语: "ko",
      老挝语: "lo",
      马来语: "ms",
      葡萄牙语: "pt",
      日语: "ja",
      泰语: "th",
      土耳其语: "tr",
      西班牙语: "es",
      意大利语: "it",
      印地语: "hi",
      印度尼西亚语: "id",
      越南语: "vi",
    },
    logo: "tranSmart.png",
  },
  microsoft: {
    name: "微软",
    api: "https://api-edge.cognitive.microsofttranslator.com/translate?from=&to=lang&api-version=3.0&includeSentenceLength=true",
    authApi: "https://edge.microsoft.com/translate/auth",
    logo: "microsoft.png",
  },
  foxIT: {
    name: "福昕",
    api: "https://fanyi.pdf365.cn/api/wordTranslateResult",
    logo: "foxIT.png",
  },
  cnki: {
    name: "CNKI",
    api: "https://dict.cnki.net/fyzs-front-api/translate/literaltranslation",
    tokenApi: "https://dict.cnki.net/fyzs-front-api/getToken",
    secret: "4e87183cfd3a45fe",
    logo: "cnki.png",
  },
  deepL: {
    name: "DeepL",
    api: "https://www2.deepl.com/jsonrpc?method=LMT_handle_jobs",
    logo: "deepL.png",
  },
  deepLX: {
    name: "DeepL X",
    api: "",
    logo: "deepL.png",
  },
  deepLFree: {
    name: "DeepL Free",
    api: "https://api-free.deepl.com/v2/translate",
    logo: "deepL.png",
  },
  deepLPro: {
    name: "DeepL Pro",
    api: "https://api.deepl.com/v2/translate",
    logo: "deepL.png",
  },
  youDao: {
    name: "有道",
    api: "http://openapi.youdao.com/api",
    langs: {
      自动: "auto",
      中文: "zh-CHS",
      中文繁体: "zh-CHT",
      英文: "en",
      日文: "ja",
      韩文: "ko",
      法文: "fr",
      阿尔巴尼亚语: "sq",
      阿拉伯文: "ar",
      阿姆哈拉语: "am",
      阿塞拜疆语: "az",
      爱尔兰语: "ga",
      爱沙尼亚语: "et",
      巴斯克语: "eu",
      白俄罗斯语: "be",
      白苗语: "mww",
      保加利亚语: "bg",
      冰岛语: "is",
      波兰语: "pl",
      波斯尼亚语: "bs",
      波斯语: "fa",
      丹麦语: "da",
      德文: "de",
      俄文: "ru",
      菲律宾语: "tl",
      斐济语: "fj",
      芬兰语: "fi",
      弗里西语: "fy",
      高棉语: "km",
      格鲁吉亚语: "ka",
      古吉拉特语: "gu",
      哈萨克语: "kk",
      海地克里奥尔语: "ht",
      豪萨语: "ha",
      荷兰语: "nl",
      加利西亚语: "gl",
      加泰隆语: "ca",
      捷克语: "cs",
      卡纳达语: "kn",
      柯尔克孜语: "ky",
      科西嘉语: "co",
      克雷塔罗奥托米语: "otq",
      克林贡语: "tlh",
      克罗地亚语: "hr",
      库尔德语: "ku",
      拉丁语: "la",
      拉脱维亚语: "lv",
      老挝语: "lo",
      立陶宛语: "lt",
      卢森堡语: "lb",
      罗马尼亚语: "ro",
      马尔加什语: "mg",
      马耳他语: "mt",
      马拉地语: "mr",
      马拉雅拉姆语: "ml",
      马来语: "ms",
      马其顿语: "mk",
      毛利语: "mi",
      蒙古语: "mn",
      孟加拉语: "bn",
      缅甸语: "my",
      南非荷兰语: "af",
      南非科萨语: "xh",
      南非祖鲁语: "zu",
      尼泊尔语: "ne",
      挪威语: "no",
      旁遮普语: "pa",
      葡萄牙文: "pt",
      普什图语: "ps",
      齐切瓦语: "ny",
      瑞典语: "sv",
      萨摩亚语: "sm",
      "塞尔维亚语(拉丁文)": "sr-Latn",
      "塞尔维亚语(西里尔文)": "sr-Cyrl",
      塞索托语: "st",
      僧伽罗语: "si",
      世界语: "eo",
      斯洛伐克语: "sk",
      斯洛文尼亚语: "sl",
      斯瓦希里语: "sw",
      苏格兰盖尔语: "gd",
      宿务语: "ceb",
      索马里语: "so",
      塔吉克语: "tg",
      塔希提语: "ty",
      泰卢固语: "te",
      泰米尔语: "ta",
      泰语: "th",
      汤加语: "to",
      土耳其语: "tr",
      威尔士语: "cy",
      乌尔都语: "ur",
      乌克兰语: "uk",
      乌兹别克语: "uz",
      西班牙文: "es",
      希伯来语: "he",
      希腊语: "el",
      夏威夷语: "haw",
      信德语: "sd",
      匈牙利语: "hu",
      修纳语: "sn",
      巽他语: "su",
      亚美尼亚语: "hy",
      伊博语: "ig",
      意大利文: "it",
      意第绪语: "yi",
      印地语: "hi",
      印尼文: "id",
      尤卡坦玛雅语: "yua",
      约鲁巴语: "yo",
      越南文: "vi",
      粤语: "yue",
      爪哇语: "jw",
    },
    logo: "youDao.png",
  },
  baiDu: {
    name: "百度",
    api: "https://fanyi-api.baidu.com/api/trans/vip/translate",
    logo: "baiDu.png",
  },
  aliYun: {
    name: "阿里",
    api: "mt.cn-hangzhou.aliyuncs.com",
    path: "/api/translate/web/general",
    langs: {
      自动: "auto",
      英语: "en",
      中文: "zh",
      日语: "ja",
      韩语: "ko",
      法语: "fr",
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
    logo: "aliYun.png",
  },
  tencent: {
    name: "腾讯",
    api: "tmt.tencentcloudapi.com",
    logo: "tencent.png",
  },
  huoShan: {
    name: "火山",
    api: "open.volcengineapi.com",
    action: "TranslateText",
    version: "2020-06-01",
    region: "cn-north-1",
    service: "translate",
    logo: "huoShan.png",
  },
  huaWei: {
    name: "华为",
    api: "https://nlp-ext.cn-north-4.myhuaweicloud.com/v1/project_id/machine-translation/text-translation",
    langs: {
      自动: "auto",
      "中文（简体）": "zh",
      "中文（繁体）": "zh-tw",
      英语: "en",
      阿拉伯语: "ar",
      德语: "de",
      俄语: "ru",
      法语: "fr",
      韩语: "ko",
      葡萄牙语: "pt",
      日语: "ja",
      泰语: "th",
      土耳其语: "tr",
      西班牙语: "es",
      越南语: "vi",
    },
    logo: "huaWei.png",
  },
  caiYun: {
    name: "彩云小译",
    api: "http://api.interpreter.caiyunai.com/v1/translator",
    langs: {
      自动: "auto",
      中文: "zh",
      英语: "en",
      日语: "ja",
    },
    logo: "caiYun.png",
  },
  xiaoNiu: {
    name: "小牛",
    api: "https://api.niutrans.com/NiuTransServer/translation",
    logo: "xiaoNiu.png",
  },
  uToolsAI: {
    name: "uTools AI",
    logo: "uToolsAI.png",
  },
  deepSeek: {
    name: "DeepSeek",
    api: "https://api.deepseek.com/v1",
    path: "/chat/completions",
    logo: "deepSeek.svg",
  },
};

// Set the default API.
const defaultAPI = Object.keys(options)[1];
const defaultAI = "deepseek-r1";

const DEFAULT_SPEAK = {
  speakSwitch: true,
  speakEngine: "Google",
  speakContent: "Source",
};

const DEFAULT_VARIABLE = {
  variableSwitch: false,
  variableContent: "Result",
  variableSource: "camelCase",
  variableResult: ["camelCase"],
};

const DEFAULT_DEBOUNCING = 500;

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
  推荐: "翻译内容多，翻译准确",
  AI: "AI翻译"
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
    addDebouncingListener();
    addProxyListener();
    addApiListener();
    addSiteListener();
    addKeyPasswordListener();
    addEyeListener();
    addLangListener();
    addExchangeListener();
    addDeepSeekModelListener();
    addBadgeListener();
    addSettingResizeListener();
  }
  setWindowHeight();
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
  updateMenuClass(option);

  loadVersion();
  loadSpeak();
  loadVariable();
  loadDebouncing();
  loadProxy();
  loadIdSecret();
  loadLang();
  loadUToolsAI();
}

function updateMenuClass(service) {
  $('#setting > .body > .side > .services > .service').each(function () {
    const $el = $(this);
    const serviceClass = Array.from($el[0].classList)
      .find(className => className !== 'service' && className !== 'active');
    $el.toggleClass('active', serviceClass === service);
  });
  $('#setting > .header > .engine > .engine-logo').attr('src', `./assets/images/${options[service].logo}`);
  $('#setting > .header > .engine > .engine-name').text(options[service].name);
}

/**
 * Load the version of the plugin.
 */
function loadVersion() {
  $("#pluginVersion").text(window.getVersion());
}

function loadIdSecret() {
  // 配置信息：存储键名 -> 元素ID
  const configArr = [
    'deepLXApi',
    'deepLFreeSecret',
    'deepLProSecret',
    'youDaoAppId',
    'youDaoAppSecret',
    'youDaoVocab',
    'baiDuAppId',
    'baiDuAppSecret',
    'aliYunAppId',
    'aliYunAppSecret',
    'tencentAppId',
    'tencentAppSecret',
    'huoShanAppId',
    'huoShanAppSecret',
    'huaWeiAK',
    'huaWeiSK',
    'huaWeiProjectId',
    'caiYunToken',
    'xiaoNiuToken',
    'deepSeekAPIKey',
    'deepSeekPrompt',
    'deepSeekModel'
  ];

  configArr.forEach(key => {
    const value = utools.dbStorage.getItem(key);
    if (value) {
      document.getElementById(key).value = value;
    }
  });
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
    utools.dbStorage.removeItem("variableCase");
  }

  document.getElementById("funcSwitchVariable").checked = variable["variableSwitch"];

  const variableSource = variable["variableSource"];
  const variableResult = variable["variableResult"];

  // Init Result.
  let varChecks = document.querySelectorAll('.varFormatter > div > input[type="checkbox"]');
  varChecks.forEach(check => {
    check.checked = false;
  });
  let valueArr = [];
  for (let i = 0; i < variableResult.length; i++) {
    for (let j = 0; j < varChecks.length; j++) {
      const value = varChecks[j].getAttribute("value");
      if (variableResult[i] == value) {
        varChecks[j].checked = true;
      }
    }
    valueArr.push(variableNameMap[variableResult[i]]);
  }
  document.querySelector(".varSequence > .varSequenceValue").textContent = valueArr.join(" > ");

  // Init Source.
  $("#variableSelect").val(variableSource);

  const variableContent = variable["variableContent"];
  if ("Result" == variableContent) {
    document.getElementById("variableRadioResult").checked = true;
    $(".varSource").addClass("hide");
    $(".varResult").removeClass("hide");
  } else if ("Source" == variableContent) {
    document.getElementById("variableRadioSource").checked = true;
    $(".varSource").removeClass("hide");
    $(".varResult").addClass("hide");
  }

  updateVariableStatus(variable["variableSwitch"]);
}

/**
 * Loads the debouncing time setting from the database and applies it to the corresponding element on the page.
 * If the debouncing time setting is not found in the database, it defaults to the DEFAULT_DEBOUNCING value.
 */
function loadDebouncing() {
  let debouncingTime = utools.dbStorage.getItem("debouncingTime");

  // Check if the debouncing time setting is null or an empty string
  if (debouncingTime === null || "" == debouncingTime) {
    debouncingTime = DEFAULT_DEBOUNCING;
    utools.dbStorage.setItem("debouncingTime", debouncingTime);
  }

  document.getElementById("debouncingTime").value = debouncingTime;
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
  // 配置需要初始化的翻译服务
  const services = [
    {
      name: 'tranSmart',
      keyPrefix: 'tranSmart',
      langPath: 'tranSmart.langs',
      defaultValue: 'auto'
    },
    {
      name: 'youDao',
      keyPrefix: 'youDao',
      langPath: 'youDao.langs',
      defaultValue: 'auto'
    },
    {
      name: 'aliYun',
      keyPrefix: 'aliYun',
      langPath: 'aliYun.langs',
      defaultValue: 'auto'
    },
    {
      name: 'huaWei',
      keyPrefix: 'huaWei',
      langPath: 'huaWei.langs',
      defaultValue: 'auto'
    },
    {
      name: 'caiYun',
      keyPrefix: 'caiYun',
      langPath: 'caiYun.langs',
      defaultValue: 'auto'
    }
  ];

  services.forEach(initLanguageSelect);
}

// 通用初始化函数
function initLanguageSelect({ name, keyPrefix, langPath, defaultValue }) {
  // 获取语言配置
  const langs = getNestedProperty(options, langPath);
  const [sourceKey, targetKey] = [`${keyPrefix}Source`, `${keyPrefix}Target`];

  // 获取存储值
  const getStorageValue = key => utools.dbStorage.getItem(key) || defaultValue;
  const [sourceValue, targetValue] = [sourceKey, targetKey].map(getStorageValue);

  // 更新存储保证默认值
  [sourceKey, targetKey].forEach(key =>
    utools.dbStorage.setItem(key, key === sourceKey ? sourceValue : targetValue)
  );

  // 生成选项
  const optionsHTML = Object.entries(langs)
    .map(([langName, langCode]) =>
      `<option value="${langCode}">${langName}</option>`
    ).join('');

  // 获取并更新DOM
  const selector = `.service.${name} .lang>select`;
  const [sourceSelect, targetSelect] = document.querySelectorAll(`${selector}.source, ${selector}.target`);

  [sourceSelect, targetSelect].forEach(select => {
    select.innerHTML = optionsHTML;
    select.value = select === sourceSelect ? sourceValue : targetValue;
  });
}

// 辅助函数：安全获取嵌套对象属性
function getNestedProperty(obj, path) {
  return path.split('.').reduce((acc, part) => acc?.[part], obj);
}

async function loadUToolsAI() {
  let models = await utools.allAiModels();
  let modelHtml = '';
  const modelIds = models.map(model => model.id);
  let uToolsAI = utools.dbStorage.getItem("uToolsAI");
  if (!uToolsAI || uToolsAI.error || modelIds.indexOf(uToolsAI) == -1) {
    // Choose the default AI.
    if (modelIds.indexOf(defaultAI) != -1) {
      uToolsAI = defaultAI;
    } else {
      uToolsAI = modelIds[0];
    }
    utools.dbStorage.setItem("uToolsAI", uToolsAI);
  }
  models.forEach(model => {
    const { id, label, icon, description, cost } = model;
    modelIds.push(id);
    const activeStr = (uToolsAI === id) ? " active" : "";
    modelHtml += `
                  <div class="model-item${activeStr}" data-id="${id}">
                    <div class="model-title floatL">
                      <span class="model-status icon${activeStr}"></span>
                      <img class="model-icon" src="${icon}"/>
                      <span class="model-name" title="${description}">${label}</span>
                    </div>
                    <div class="model-cost floatR">
                      <span class="cost-value">${cost}</span>
                      <i class="cost-icon ms-1"></i>
                      <span class="cost-freq">/ 次</span>
                    </div>
                    <div class="clearfix"></div>
                    <div class="model-desc comment">
                      ${description}
                    </div>
                  </div>
    `
  });
  document.querySelector("#uToolsAI > .detail > .models").innerHTML = modelHtml;
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
  document.getElementById("variableRadioSource").disabled = !variableSwitch;
  document.getElementById("variableSelect").disabled = !variableSwitch;
  document.querySelectorAll('.varFormatter > div > input[type="checkbox"]').forEach(check => {
    check.disabled = !variableSwitch;
  });
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
    if ("Source" == this.value) {
      $(".varSource").removeClass("hide");
      $(".varResult").addClass("hide");
    } else {
      $(".varSource").addClass("hide");
      $(".varResult").removeClass("hide");
    }
  });

  $('.varFormatter > div > input[type="checkbox"]').click(function () {
    let variable = utools.dbStorage.getItem("variable");
    let variableResult = variable["variableResult"];
    if (this.checked) {
      variableResult.push(this.value);
      variable["variableResult"] = variableResult;
    } else {
      let temp = [];
      for (let i = 0; i < variableResult.length; i++) {
        if (this.value != variableResult[i]) {
          temp.push(variableResult[i]);
        }
      }
      variable["variableResult"] = temp;
    }

    let valueArr = [];
    for (let i = 0; i < variable["variableResult"].length; i++) {
      valueArr.push(variableNameMap[variable["variableResult"][i]]);
    }
    utools.dbStorage.setItem("variable", variable);
    document.querySelector(".varSequence > .varSequenceValue").textContent = valueArr.join(" > ");
  });

  const variableSelect = document.getElementById("variableSelect");
  variableSelect.addEventListener("change", e => {
    let variable = utools.dbStorage.getItem("variable");
    const { value } = e.target;
    variable["variableSource"] = value;
    utools.dbStorage.setItem("variable", variable);
  });
}

/**
 * Add the debouncing listener.
 */
function addDebouncingListener() {
  $("#debouncingTime").blur(function () {
    let temp = this.value.trim();
    temp = temp.replace(/^(0+)|[^\d]+/g, "");
    this.value = temp;
    utools.dbStorage.setItem("debouncingTime", parseInt(temp));
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
    updateMenuClass(this.value);
    let AIName = "";
    if (this.value == "uToolsAI") {
      const modelNameElement = document.querySelector('.models > .model-item.active .model-name');
      AIName = modelNameElement ? modelNameElement.textContent : "";
    }
    utools.showNotification(`翻译引擎切换至${options[this.value]["name"]} ${AIName}！`);
  });

  $('.models').on('click', '.model-item', function () {
    // 缓存jQuery对象提升性能
    const $this = $(this);

    // 使用data()方法规范获取自定义属性
    const modelId = $this.data('id');
    // 使用text().trim()避免空白干扰
    const AIName = $this.find('.model-name').text().trim();

    // 存储配置信息
    utools.dbStorage.setItem('option', 'uToolsAI');
    utools.dbStorage.setItem('uToolsAI', modelId);

    // 批量操作DOM（减少重绘次数）
    $('.models > .model-item').removeClass('active').find('.model-status').attr('class', 'model-status icon');

    // 设置当前激活项（链式调用优化）
    $this.addClass('active').find('.model-status').addClass('active');

    // 更新菜单状态
    updateMenuClass('uToolsAI');
    document.querySelector('input[type="radio"][name="service"][value="uToolsAI"]').checked = true;

    // 显示反馈通知
    utools.showNotification(`翻译引擎切换至uToolsAI ${AIName}！`);
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
  // 需要监听的输入框ID列表
  const inputKeys = [
    'deepLXApi', 'deepLFreeSecret', 'deepLProSecret',
    'youDaoAppId', 'youDaoAppSecret', 'youDaoVocab',
    'baiDuAppId', 'baiDuAppSecret',
    'aliYunAppId', 'aliYunAppSecret',
    'tencentAppId', 'tencentAppSecret',
    'huoShanAppId', 'huoShanAppSecret',
    'huaWeiAK', 'huaWeiSK', 'huaWeiProjectId',
    'caiYunToken', 'xiaoNiuToken', 'deepSeekAPIKey', 'deepSeekPrompt'
  ];

  // 统一事件处理
  inputKeys.forEach(key => {
    $(`#${key}`).on('blur', function () {
      utools.dbStorage.setItem(key, this.value.trim());
    });
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

// 配置所有翻译服务的监听参数
const langServices = [
  {
    name: 'tranSmart',
    changeHandler: changeBrotherTranSmart,
    exchangeHandler: changeBrotherTranSmart,
    sourceClass: 'source',
    targetClass: 'target'
  },
  {
    name: 'youDao',
    changeHandler: changeBrotherYouDao,
    exchangeHandler: changeBrotherYouDao,
    sourceClass: 'source',
    targetClass: 'target'
  },
  {
    name: 'aliYun',
    changeHandler: changeBrotherAliYun,
    exchangeHandler: changeBrotherAliYun,
    sourceClass: 'source',
    targetClass: 'target'
  },
  {
    name: 'huaWei',
    changeHandler: changeBrotherHuaWei,
    exchangeHandler: changeBrotherHuaWei,
    sourceClass: 'source',
    targetClass: 'target'
  },
  {
    name: 'caiYun',
    changeHandler: changeBrotherCaiYun,
    exchangeHandler: changeBrotherCaiYun,
    sourceClass: 'source',
    targetClass: 'target'
  }
];

// 语言选择监听器
function addLangListener() {
  // 统一事件处理
  langServices.forEach(service => {
    const selector = `.service.${service.name} .lang>select`;
    const sourceSelector = `${selector}.${service.sourceClass}`;
    const targetSelector = `${selector}.${service.targetClass}`;

    // Source 变化监听
    $(sourceSelector).on('change', function () {
      const $target = $(targetSelector);
      service.changeHandler(this.value, $target);
      updateStorage(service.name, 'Source', this.value);
      updateStorage(service.name, 'Target', $target.val());
    });

    // Target 变化监听
    $(targetSelector).on('change', function () {
      const $source = $(sourceSelector);
      service.changeHandler(this.value, $source);
      updateStorage(service.name, 'Target', this.value);
      updateStorage(service.name, 'Source', $source.val());
    });
  });
}

// 统一交换按钮监听器
function addExchangeListener() {
  langServices.forEach(service => {
    const exchangeBtn = `.service.${service.name} .lang>.exchange`;
    const sourceSelector = `.service.${service.name} .lang>select.${service.sourceClass}`;
    const targetSelector = `.service.${service.name} .lang>select.${service.targetClass}`;

    $(exchangeBtn).on('click', function () {
      const $source = $(sourceSelector);
      const $target = $(targetSelector);

      // 交换选中索引
      [sourceIndex, targetIndex] = [$target[0].selectedIndex, $source[0].selectedIndex];
      $source[0].selectedIndex = sourceIndex;
      $target[0].selectedIndex = targetIndex;

      // 触发关联更新
      service.exchangeHandler($target.val(), $source);

      // 更新存储
      updateStorage(service.name, 'Source', $source.val());
      updateStorage(service.name, 'Target', $target.val());
    });
  });
}


// DeepSeek模型选择监听器
function addDeepSeekModelListener() {
  $('#deepSeekModel').on('change', function () {
    utools.dbStorage.setItem('deepSeekModel', this.value);
  });
}

// 通用存储更新方法
function updateStorage(serviceName, direction, value) {
  const storageKey = `${serviceName}${direction}`;
  utools.dbStorage.setItem(storageKey, value);
}

/**
 * Change the value of the brother select element for TranSmart.
 * @param {String} thisValue The value of the current select element.
 * @param {Object} brother The brother jquery object of the current select element.
 */
function changeBrotherTranSmart(thisValue, brother) {
  if ("auto" == thisValue && brother[0].className.indexOf("source") != -1) {
    brother[0].selectedIndex = 0;
  }
  if (thisValue == brother.val() && "auto" != thisValue) {
    if ("en" == thisValue) {
      brother[0].selectedIndex = 1;
    } else {
      brother[0].selectedIndex = 2;
    }
  }
  if (
    (thisValue == "fr" &&
      brother.val() != "auto" &&
      brother.val() != "en" &&
      brother.val() != "zh" &&
      brother.val() != "es") ||
    (thisValue == "es" &&
      brother.val() != "auto" &&
      brother.val() != "en" &&
      brother.val() != "zh" &&
      brother.val() != "fr") ||
    (thisValue != "auto" &&
      thisValue != "en" &&
      thisValue != "zh" &&
      thisValue != "fr" &&
      thisValue != "es" &&
      brother.val() != "auto" &&
      brother.val() != "en" &&
      brother.val() != "zh")
  ) {
    brother[0].selectedIndex = 2;
  }
}

/**
 * Change the value of the brother select element for YouDao.
 * @param {String} thisValue The value of the current select element.
 * @param {Object} brother The brother jquery object of the current select element.
 */
function changeBrotherYouDao(thisValue, brother) {
  if ("auto" == thisValue && brother[0].className.indexOf("source") != -1) {
    brother[0].selectedIndex = 0;
  }
  if (thisValue == brother.val() && "auto" != thisValue) {
    if ("en" == thisValue) {
      brother[0].selectedIndex = 1;
    } else {
      brother[0].selectedIndex = 3;
    }
  }
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
  } else if (
    ("mn" == brotherValue || "yue" == brotherValue || "zh-tw" == brotherValue) &&
    "zh" != thisValue
  ) {
    if ("en" == thisValue) {
      brother[0].selectedIndex = 2;
    } else if ("auto" == thisValue) {
      brother[0].selectedIndex = 0;
    } else {
      brother[0].selectedIndex = 1;
    }
  } else if ("auto" != brotherValue && thisValue == brotherValue) {
    if ("en" == thisValue) {
      brother[0].selectedIndex = 2;
    } else {
      brother[0].selectedIndex = 1;
    }
  }
}

/**
 * Change the value of the brother select element for HuaWei.
 * @param {String} thisValue The value of the current select element.
 * @param {Object} brother The brother jquery object of the current select element.
 */
function changeBrotherHuaWei(thisValue, brother) {
  if ("auto" == thisValue && brother[0].className.indexOf("source") != -1) {
    brother[0].selectedIndex = 0;
  }
  if (thisValue == brother.val() && "auto" != thisValue) {
    if ("en" == thisValue) {
      brother[0].selectedIndex = 1;
    } else {
      brother[0].selectedIndex = 3;
    }
  }
}

/**
 * Change the value of the brother select element for CaiYun.
 * @param {String} thisValue The value of the current select element.
 * @param {Object} brother The brother jquery object of the current select element.
 */
function changeBrotherCaiYun(thisValue, brother) {
  switch (thisValue) {
    case "auto":
      if (brother[0].className.indexOf("source") != -1) {
        brother[0].selectedIndex = 0;
      }
      break;
    case "zh":
      if (
        (brother[0].className.indexOf("target") != -1 && brother[0].selectedIndex == 0) ||
        "zh" == brother.val()
      ) {
        brother[0].selectedIndex = 2;
      }
      break;
    case "en":
      if (
        (brother[0].className.indexOf("source") != -1 && "en" == brother.val()) ||
        brother[0].className.indexOf("target")
      ) {
        brother[0].selectedIndex = 1;
      }
      break;
    case "ja":
      if (
        brother[0].className.indexOf("target") != -1 ||
        ("auto" != brother.val() && "zh" != brother.val())
      ) {
        brother[0].selectedIndex = 1;
      }
      break;
    default:
      break;
  }
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
          top: $(this).offset().top - 8,
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

/**
 * Content size according to the window size changes.
 */
function addSettingResizeListener() {
  window.onresize = function () {
    setWindowHeight();
  };
}

function setWindowHeight() {
  const winHeight = window.innerHeight;
  const height = winHeight - 81 + "px";
  document.querySelector("#setting > .body > .side").style.maxHeight = height;
  document.querySelector("#setting > .body > .content").style.maxHeight = height;
}
