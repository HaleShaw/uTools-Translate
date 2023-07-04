# uTools-Translate

## uTools 插件 - 翻译

> 自 v3.0.0 起，将插件《词典》<img src="https://raw.githubusercontent.com/HaleShaw/uTools-Translate/main/screenshots/logoDictionary.png" height="28px" witdh="28px">和《Translate》<img src="https://raw.githubusercontent.com/HaleShaw/uTools-Translate/main/screenshots/logoTranslate.png" height="28px" witdh="28px">合并为《翻译》<img src="https://raw.githubusercontent.com/HaleShaw/uTools-Translate/main/logo.png" height="28px" witdh="28px">

![Translate](https://raw.githubusercontent.com/HaleShaw/uTools-Translate/main/screenshots/Translate.gif)

## Screenshots

- 翻译句子，列表模式

  ![translateSentence](https://raw.githubusercontent.com/HaleShaw/uTools-Translate/main/screenshots/translateSentence.png)

- 百度 API

  ![translateBaidu](https://raw.githubusercontent.com/HaleShaw/uTools-Translate/main/screenshots/translateBaidu.png)

- 结果过长提示

  ![translatePrompt](https://raw.githubusercontent.com/HaleShaw/uTools-Translate/main/screenshots/translatePrompt.png)

- 设置页面

  ![translateSetting](https://raw.githubusercontent.com/HaleShaw/uTools-Translate/main/screenshots/translateSetting.png)

- 语言设置

  ![translateYouDao](https://raw.githubusercontent.com/HaleShaw/uTools-Translate/main/screenshots/translateYouDao.png)

- 有道 WAP API，页面模式

  ![translatePage](https://raw.githubusercontent.com/HaleShaw/uTools-Translate/main/screenshots/translatePage.png)

- 变量模式

  ![translateVariable](https://raw.githubusercontent.com/HaleShaw/uTools-Translate/main/screenshots/translateVariable.png)

- 列表模式，暗黑模式

  ![translateListDark](https://raw.githubusercontent.com/HaleShaw/uTools-Translate/main/screenshots/translateListDark.png)

- 页面模式，暗黑模式

  ![translatePageDark](https://raw.githubusercontent.com/HaleShaw/uTools-Translate/main/screenshots/translatePageDark.png)

- 设置页面，暗黑模式

  ![translateSettingDark](https://raw.githubusercontent.com/HaleShaw/uTools-Translate/main/screenshots/translateSettingDark.png)

## Features

1. 支持中英文等 214 种语言互译
2. 支持切换翻译 API
3. 支持单词、句子及段落翻译
4. 支持查询音标
5. 支持多个朗读引擎
6. 支持朗读源文本及翻译结果
7. 支持快捷键朗读（**Windows**：英式 `Alt+S`，美式 `Alt+D` | **Mac OS**：英式 `Ctrl+S`，美式 `Ctrl+D`）
8. 支持自动复制翻译结果
9. 支持自动翻译剪贴板文本
10. 支持单词变形
11. 支持自动即时查询
12. 支持源语言和目标语言设置
13. 支持按变量格式化内容
14. 支持翻译变量
15. 支持代理设置
16. 支持暗黑模式

## API

1. 有道词典
   - <http://fanyi.youdao.com>
   - 官方提示此版本 API 已经停用，但经测试现还能使用。
   - 不过调用频率不能太高，否则容易暂时被封禁。
2. 有道翻译
   - <https://m.youdao.com>
   - 属于移动端网页 API，精准度不是非常高。
   - 为页面模式，翻译结果较多时显示效果更好。
3. 有道翻译免费版
   - <http://fanyi.youdao.com>
   - 翻译内容较少，仅有基本翻译。
   - 支持中文与英、日、韩互译。
4. 谷歌
   - <https://translate.googleapis.com>
   - 翻译内容较少，仅有基本翻译。
   - 若不能直接访问谷歌，可修改 hosts。
5. 谷歌
   - <https://translate.google.com>
   - 翻译内容较少，仅有基本翻译。
   - 若不能直接访问谷歌，可修改 hosts，或设置代理。
6. 必应
   - <http://cn.bing.com/dict>
   - 必应词典，仅支持单词，不支持句子。
7. 爱词霸
   - <https://ifanyi.iciba.com>
   - 翻译内容较少，仅有基本翻译。
8. CNKI
   - <https://dict.cnki.net>
   - 学术翻译
9. DeepL
   - <https://www2.deepl.com/jsonrpc?method=LMT_handle_jobs>
   - 免费 API，响应相对较慢。
10. DeepL API
    - <https://api-free.deepl.com/v2/translate>
    - <https://api.deepl.com/v2/translate>
    - 官方 API，分别对应 Free 和 Pro 版，需要到[DeepL API](https://www.deepl.com/pro-api)订阅方案并获取 Auth Key。
11. 有道翻译
    - <http://openapi.youdao.com/api>
    - 支持 112 种语言互译，其中自动可以识别中文、英文、日文、韩文、法文、西班牙文、葡萄牙文、俄文、越南文、德文、阿拉伯文、印尼文、意大利文
    - 需要到[有道智云](https://ai.youdao.com/doc.s)申请获取应用 ID 和应用密钥。
12. 百度翻译
    - <https://fanyi-api.baidu.com/api/trans/vip/translate>
    - 翻译内容较少，仅有基本翻译。
    - 需要到[百度翻译开放平台](https://fanyi-api.baidu.com)申请获取 APP ID 和密钥。
13. 阿里翻译
    - <https://mt.cn-hangzhou.aliyuncs.com/api/translate/web/general>
    - 翻译内容较少，仅有基本翻译。
    - 支持 214 种语言互译。
      - 除繁体中文、蒙语、粤语外，其他 212 种语言，可支持任意两种语言之间互译。
      - 繁体中文、蒙语、粤语仅支持与中文之间的互译。
    - 需要到[阿里云](https://www.aliyun.com/product/ai/base_alimt)申请获取 AccessKey ID 和 AccessKey Secret。
14. 腾讯翻译
    - <https://tmt.tencentcloudapi.com>
    - 翻译内容较少，仅有基本翻译。
    - 需要到[腾讯云](https://cloud.tencent.com/product/tmt)申请获取 Secret ID 和 Secret Key。
15. 火山翻译
    - <https://www.volcengine.com/product/machine-translation>
    - 翻译内容较少，仅有基本翻译。
    - 需要到[火山引擎](https://www.volcengine.com/docs/4640/130262)开通服务并获取 AccessKey ID 和 AccessKey Secret。
16. 彩云小译
    - <http://api.interpreter.caiyunai.com/v1/translator>
    - 翻译内容较少，仅有基本翻译。
    - 需要到[彩云科技](https://fanyi.caiyunapp.com/#/api)申请获取应用 Token。
17. 小牛翻译
    - <https://niutrans.com/text_trans>
    - 翻译内容较少，仅有基本翻译。
    - 需要到[小牛翻译](https://niutrans.com/cloud/account_info/info)获取 API-KEY。

## Reference

- [Wox.Plugin.Youdao](https://github.com/Wox-launcher/Wox.Plugin.Youdao)

  借用[作者](https://github.com/bao-qian)提供的 API，感谢！

- [myDictionary-uToolsPlugin](https://github.com/vst93/myDictionary-uToolsPlugin)

  借用[作者](https://github.com/vst93)提供的 HTML 解析方式，感谢！

## Contributors

- [![HandsomeWalker](https://avatars.githubusercontent.com/u/21039404?s=64&v=4)HandsomeWalker](https://github.com/HandsomeWalker)

- [![yqs112358](https://avatars.githubusercontent.com/u/37969157?s=64&v=4)YQ](https://github.com/yqs112358)

## License

Copyright (c) 2021-present, HaleShaw.

The project is licensed under the [GNU General Public License v3.0](https://github.com/HaleShaw/uTools-Translate/blob/main/LICENSE).
