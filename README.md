# uTools-Translate

uTools plugin - Translate

uTools 插件 - 翻译

自v3.0.0起，将插件《词典》<img src="https://raw.githubusercontent.com/HaleShaw/uTools-Translate/main/screenshots/logoDictionary.png" height="28px" witdh="28px">和《Translate》<img src="https://raw.githubusercontent.com/HaleShaw/uTools-Translate/main/screenshots/logoTranslate.png" height="28px" witdh="28px">合并为《翻译》<img src="https://raw.githubusercontent.com/HaleShaw/uTools-Translate/main/logo.png" height="28px" witdh="28px">

**朗读功能为朗读输入框中的内容，而非翻译结果。**

![Translate](https://raw.githubusercontent.com/HaleShaw/uTools-Translate/main/screenshots/Translate.gif)

## Screenshots

- 翻译句子，列表模式

  ![translateSentence](https://raw.githubusercontent.com/HaleShaw/uTools-Translate/main/screenshots/translateSentence.png)

- 百度API

  ![translateBaidu](https://raw.githubusercontent.com/HaleShaw/uTools-Translate/main/screenshots/translateBaidu.png)

- 结果过长提示

  ![translatePrompt](https://raw.githubusercontent.com/HaleShaw/uTools-Translate/main/screenshots/translatePrompt.png)

- 设置页面

  ![translateSetting](https://raw.githubusercontent.com/HaleShaw/uTools-Translate/main/screenshots/translateSetting.png)

- 语言设置

  ![translateAliYun](https://raw.githubusercontent.com/HaleShaw/uTools-Translate/main/screenshots/translateAliYun.png)

- 有道WAP API，页面模式

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

- 支持中英文翻译
- 支持切换翻译API
- 支持单词句子翻译
- 支持查询音标，朗读
- 支持句子朗读
- 支持自动复制翻译结果
- 支持自动翻译剪贴板文本
- 支持单词变形
- 支持自动即时查询
- 支持源语言和目标语言设置
- 支持变量命名
- 支持暗黑模式

## API

- 有道词典

  <http://fanyi.youdao.com>

  官方提示此版本API已经停用，但经测试现还能使用。

  不过调用频率不能太高，否则容易暂时被封禁。

- 有道翻译

  <https://m.youdao.com>

  属于移动端网页API，精准度不是非常高。

- 有道翻译免费版

  <http://fanyi.youdao.com>

  翻译内容较少，仅有基本翻译。

  支持中文与英、日、韩互译。

- 谷歌

  <https://translate.google.cn>

  翻译内容较少，仅有基本翻译。

- 小牛

  <https://test.niutrans.com>

  翻译内容较少，仅有基本翻译。

- DeepL

  <https://www2.deepl.com/jsonrpc?method=LMT_handle_jobs>

  国外API，响应相对较慢。

- 必应

  <http://cn.bing.com/dict>

  必应词典，仅支持单词，不支持句子。

- 有道翻译

  <http://openapi.youdao.com/api>

  需要到[有道智云](https://ai.youdao.com/doc.s)申请获取应用ID和应用密钥。

- 百度翻译

  <https://fanyi-api.baidu.com/api/trans/vip/translate>

  翻译内容较少，仅有基本翻译。

  需要到[百度翻译开放平台](http://api.fanyi.baidu.com)申请获取应用ID和应用密钥。

- 阿里翻译

  <https://mt.cn-hangzhou.aliyuncs.com/api/translate/web/general>

  翻译内容较少，仅有基本翻译。

  支持214种语言互译。

      除繁体中文、蒙语、粤语外，其他212种语言，可支持任意两种语言之间互译。

      繁体中文、蒙语、粤语仅支持与中文之间的互译。

  需要到[阿里云](https://www.aliyun.com/product/ai/base_alimt)申请获取应用ID和应用密钥。

- 腾讯翻译

  <https://tmt.tencentcloudapi.com>

  翻译内容较少，仅有基本翻译。

  需要到[腾讯云](https://cloud.tencent.com/product/tmt)申请获取应用ID和应用密钥。

- 彩云小译

  <http://api.interpreter.caiyunai.com/v1/translator>

  翻译内容较少，仅有基本翻译。

  需要到[彩云科技](https://fanyi.caiyunapp.com/#/api)申请获取应用Token。

## Reference

- [Wox.Plugin.Youdao](https://github.com/Wox-launcher/Wox.Plugin.Youdao)

  借用[作者](https://github.com/bao-qian)提供的API，感谢！

- [myDictionary-uToolsPlugin](https://github.com/vst93/myDictionary-uToolsPlugin)

  借用[作者](https://github.com/vst93)提供的HTML解析方式，感谢！

## Contributors

[![HandsomeWalker](https://avatars.githubusercontent.com/u/21039404?s=64&v=4)HandsomeWalker](https://github.com/HandsomeWalker)

## License

Copyright (c) 2021-present, HaleShaw.

The project is licensed under the [GNU General Public License v3.0](https://github.com/HaleShaw/uTools-Translate/blob/main/LICENSE).
