# uTools-Translate

## uTools 插件 - 翻译

> 自 v3.0.0 起，将插件《词典》<img src="https://raw.githubusercontent.com/HaleShaw/uTools-Translate/main/screenshots/logoDictionary.png" height="28px" witdh="28px">和《Translate》<img src="https://raw.githubusercontent.com/HaleShaw/uTools-Translate/main/screenshots/logoTranslate.png" height="28px" witdh="28px">合并为《翻译》<img src="https://raw.githubusercontent.com/HaleShaw/uTools-Translate/main/logo.png" height="28px" witdh="28px">

![Translate](https://raw.githubusercontent.com/HaleShaw/uTools-Translate/main/screenshots/Translate.gif)

## Screenshots

- 翻译句子，列表模式

  ![translateSentence](https://raw.githubusercontent.com/HaleShaw/uTools-Translate/main/screenshots/translateSentence.png)

- 百度 API

  ![translateBaidu](https://raw.githubusercontent.com/HaleShaw/uTools-Translate/main/screenshots/translateBaidu.png)

- 结果过长自动展开

  ![translateExpand](https://raw.githubusercontent.com/HaleShaw/uTools-Translate/main/screenshots/translateExpand.png)

- 设置页面

  ![translateSetting](https://raw.githubusercontent.com/HaleShaw/uTools-Translate/main/screenshots/translateSetting.png)

- 语言设置

  ![translateYouDao](https://raw.githubusercontent.com/HaleShaw/uTools-Translate/main/screenshots/translateYouDao.png)

- 有道 WAP API，页面模式

  ![translatePage](https://raw.githubusercontent.com/HaleShaw/uTools-Translate/main/screenshots/translatePage.png)

- 变量模式

  ![translateVariable](https://raw.githubusercontent.com/HaleShaw/uTools-Translate/main/screenshots/translateVariable.png)

- 推送到主输入框

  ![translateMainPush](https://raw.githubusercontent.com/HaleShaw/uTools-Translate/main/screenshots/translateMainPush.png)

- 列表模式，暗黑模式

  ![translateListDark](https://raw.githubusercontent.com/HaleShaw/uTools-Translate/main/screenshots/translateListDark.png)

- 页面模式，暗黑模式

  ![translatePageDark](https://raw.githubusercontent.com/HaleShaw/uTools-Translate/main/screenshots/translatePageDark.png)

- 设置页面，暗黑模式

  ![translateSettingDark](https://raw.githubusercontent.com/HaleShaw/uTools-Translate/main/screenshots/translateSettingDark.png)

## Features

1. 支持中英文等 214 种语言互译
2. 支持切换翻译 API
3. 支持AI翻译
4. 支持自定义OpenAI配置
5. 支持单词、句子及段落翻译
6. 支持查询音标
7. 支持多个朗读引擎
8. 支持朗读源文本及翻译结果
9. 支持快捷键朗读（**Windows**：英式 `Alt+S`，美式 `Alt+D` | **Mac OS**：英式 `Ctrl+S`，美式 `Ctrl+D`）
10. 支持自动复制翻译结果
11. 支持自动翻译剪贴板文本
12. 支持单词变形
13. 支持术语表
14. 支持自动即时查询
15. 支持源语言和目标语言设置
16. 支持按变量格式化内容
17. 支持翻译变量
18. 支持代理设置
19. 支持暗黑模式
20. 支持 LOGO 显示翻译引擎
21. 支持快捷键上下移动（向下：`Down` / `Ctrl+N` / `Ctrl+J`，向上：`Up` / `Ctrl+P` / `Ctrl+K`）
22. 支持自定义API防抖时间
23.支持推送翻译结果到主搜索框

## API

1. 有道翻译
   - <https://m.youdao.com>
   - 属于移动端网页 API，精准度不是非常高。
   - 为页面模式，翻译结果较多时显示效果更好。
2. 有道翻译
   - <https://dict.youdao.com/webtranslate>
   - 属于网页版 API，单次翻译字数限制为 5000 字。
3. 百度翻译
   - <https://fanyi.baidu.com/ait/text/translate>
   - 单次翻译字数限制为 1000 字。
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
8. 腾讯交互翻译
   - <https://transmart.qq.com>
   - 翻译内容较少，仅有基本翻译。
   - 支持 21 种语言互译。
     - 法语、西班牙语、英语和中文能互译，其他语言都只能与英语和中文互译。
9. 微软
   - <https://api-edge.cognitive.microsofttranslator.com/translate>
   - 翻译内容较少，仅有基本翻译。
10. 福昕
    - <https://fanyi.pdf365.cn>
    - 翻译内容较少，仅有基本翻译。
11. CNKI
    - <https://dict.cnki.net>
    - 学术翻译
12. DeepL
    - <https://www2.deepl.com/jsonrpc?method=LMT_handle_jobs>
    - 免费 API，响应相对较慢。
13. DeepL X
    - <https://github.com/OwO-Network/DeepLX>
    - 将 DeepL API 逆向之后的三方包，不再需要 Auth Key，基于 DeepL Free 版。
    - 需要配置 API 的地址。
14. DeepL API
    - <https://api-free.deepl.com/v2/translate>
    - <https://api.deepl.com/v2/translate>
    - <https://api.deepl.com/v2/translate>
    - 官方 API，分别对应 Free 和 Pro 版，需要到[DeepL API](https://www.deepl.com/pro-api)订阅方案并获取 Auth Key。
15. 有道翻译
    - <http://openapi.youdao.com/api>
    - 支持 112 种语言互译，其中自动可以识别中文、英文、日文、韩文、法文、西班牙文、葡萄牙文、俄文、越南文、德文、阿拉伯文、印尼文、意大利文
    - 支持术语表
    - 需要到[有道智云](https://ai.youdao.com/doc.s)申请获取应用 ID 和应用密钥。
16. 百度翻译
    - <https://fanyi-api.baidu.com/api/trans/vip/translate>
    - 翻译内容较少，仅有基本翻译。
    - 需要到[百度翻译开放平台](https://fanyi-api.baidu.com)申请获取 APP ID 和密钥。
17. 阿里翻译
    - <https://mt.cn-hangzhou.aliyuncs.com/api/translate/web/general>
    - 翻译内容较少，仅有基本翻译。
    - 支持 214 种语言互译。
      - 除繁体中文、蒙语、粤语外，其他 212 种语言，可支持任意两种语言之间互译。
      - 繁体中文、蒙语、粤语仅支持与中文之间的互译。
    - 需要到[阿里云](https://www.aliyun.com/product/ai/base_alimt)申请获取 Access Key ID 和 Secret Access Key。
18. 腾讯翻译君
    - <https://tmt.tencentcloudapi.com>
    - 翻译内容较少，仅有基本翻译。
    - 需要到[腾讯云](https://cloud.tencent.com/product/tmt)申请获取 Secret ID 和 Secret Key。
19. 火山翻译
    - <https://www.volcengine.com/product/machine-translation>
    - 翻译内容较少，仅有基本翻译。
    - 需要到[火山引擎](https://www.volcengine.com/docs/4640/130262)开通服务并获取 Access Key ID 和 Secret Access Key。
20. 华为翻译
    - <https://support.huaweicloud.com/api-nlp/nlp_03_0024.html>
    - 翻译内容较少，仅有基本翻译。
    - 需要到[华为云](https://www.huaweicloud.com/product/nlpf.html)开通服务并获取 AK、SK 和 Project ID。
21. 彩云小译
    - <http://api.interpreter.caiyunai.com/v1/translator>
    - 翻译内容较少，仅有基本翻译。
    - 需要到[彩云科技](https://fanyi.caiyunapp.com/#/api)申请获取应用 Token。
22. 小牛翻译
    - <https://niutrans.com/text_trans>
    - 翻译内容较少，仅有基本翻译。
    - 需要到[小牛翻译](https://niutrans.com/cloud/account_info/info)获取 API-KEY。
23. uTools AI
    - <https://www.u-tools.cn/docs/developer/api-reference/utools/ai.html#utools-allaimodels>
    - 由uTools团队提供的AI中转服务，每次将自动消耗uTools的AI能量。
    - 支持模型：`豆包 1.5 Pro`、`DeepSeek-v3`、`DeepSeek-R1`、`QwQ-32B`、`文心一言 3.5`、`文心一言 Speed`、`智普 GLM4-flash`、`通义千问 long`
24. DeepSeek
    - <https://platform.deepseek.com>
    - 服务商原因，响应相对较慢。
    - 支持模型：`DeepSeek-V3`、`DeepSeek-R1`
    - 需要到[开放平台](https://platform.deepseek.com/api_keys)创建 API-KEY。
25. OpenAI
    - <https://platform.openai.com/>
    - 支持OpenAI的各种模型，可自定义请求URL（如各种三方代理平台的请求URL）。
    - 若URL未配置，则默认请求OpenAI官方URL。
    - OpenAI官方API-Key可到[开放平台](https://platform.openai.com/settings/organization/api-keys)创建。

## Reference

- [Wox.Plugin.Youdao](https://github.com/Wox-launcher/Wox.Plugin.Youdao)

  借用[作者](https://github.com/bao-qian)提供的 API，感谢！

- [myDictionary-uToolsPlugin](https://github.com/vst93/myDictionary-uToolsPlugin)

  借用[作者](https://github.com/vst93)提供的 HTML 解析方式，感谢！

## Contributors

- [![HandsomeWalker](https://avatars.githubusercontent.com/u/21039404?s=64&v=4)HandsomeWalker](https://github.com/HandsomeWalker)

- [![yqs112358](https://avatars.githubusercontent.com/u/37969157?s=64&v=4)YQ](https://github.com/yqs112358)

- [![Jackfruit-monster](https://avatars.githubusercontent.com/u/29976846?s=64&v=4)Jackfruit-monster](https://github.com/Jackfruit-monster)

- kaixinguo kxg12345679@163.com

## License

Copyright (c) 2021-present, HaleShaw.

The project is licensed under the [GNU General Public License v3.0](https://github.com/HaleShaw/uTools-Translate/blob/main/LICENSE).
