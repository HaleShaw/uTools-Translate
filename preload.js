const http = require('http');
const translateApi =
    'http://fanyi.youdao.com/openapi.do?keyfrom=WoxLauncher&key=1247918016&type=data&doctype=json&version=1.1&q=';

function doGet(url) {
    return new Promise((resolve, reject) => {
        http.get(url, res => {
            res.setEncoding('utf8');
            let rawData = '';
            res.on('data', chunk => {
                rawData += chunk;
            });
            res.on('end', () => {
                try {
                    console.log(rawData);
                    if (rawData.indexOf('frequent-error') != -1) {
                        resolve({
                            errorCode: 302
                        });
                    } else {
                        const parsedData = JSON.parse(rawData);
                        resolve(parsedData);
                    }
                } catch (e) {
                    console.error(e.message);
                    reject(e.message);
                }
            });
        }).on('error', e => {
            console.error(e.message);
            reject(e.message);
        });
    });
}

async function getData(url) {
    let response = await doGet(url);
    const errorCode = response.errorCode;
    let data = [];
    const dataIcon = 'logo.png';
    if (0 == errorCode) {
        const trans = response.translation;
        const basic = response.basic;
        if (trans != null) {
            let dataTitle = trans.join(', ');
            if (basic != null && basic.phonetic != null) {
                dataTitle += ' [' + basic.phonetic + ']';
            }
            data.push({ title: dataTitle, description: '翻译结果', icon: dataIcon });
        }

        if (basic != null && basic.explains != null) {
            data.push({
                title: basic.explains.join(', '),
                description: '简明释义',
                icon: dataIcon
            });
        }

        const web = response.web;
        if (web != null) {
            for (let i = 0; i < web.length; i++) {
                data.push({
                    title: web[i].value.join(', '),
                    description: '网络释义：' + web[i].key,
                    icon: dataIcon
                });
            }
        }
    } else {
        let errMsg;
        switch (errorCode) {
            case 20:
                errMsg = '要翻译的文本过长';
                break;

            case 30:
                errMsg = '无法进行有效的翻译';
                break;

            case 40:
                errMsg = '不支持的语言类型';
                break;

            case 50:
                errMsg = '无效的key';
                break;

            case 302:
                errMsg = 'API请求异常频繁，暂时被封禁，请稍后再试';
                break;

            default:
                errMsg = '其他错误';
                break;
        }
        const errTitle = '错误';
        data.push({ title: errTitle, description: errMsg, icon: dataIcon });
    }
    return data;
}

window.exports = {
    lookup: {
        mode: 'list',
        args: {
            enter: (action, callbackSetList) => {
                let word = action.payload.trim();
                console.log(word);
                // Exclude the trigger keyword.
                if (
                    !word ||
                    word == '翻译' ||
                    word == 'translate' ||
                    word == '有道' ||
                    word == 'tr'
                ) {
                    return callbackSetList();
                } else {
                    // Waiting for the plugin being ready.
                    setTimeout(() => {
                        // This event will trigger search event.
                        utools.setSubInputValue(word);
                    }, 100);
                }
            },
            search: (action, searchWord, callbackSetList) => {
                let word = searchWord.trim();
                if (!word) return callbackSetList();
                let url = translateApi + word;
                getData(url).then(data => {
                    callbackSetList(data);
                });
            },
            select: (action, itemData) => {
                window.utools.copyText(itemData.title);
                window.utools.hideMainWindow();
                window.utools.outPlugin();
            },
            placeholder: '请输入需要查询的中英文内容'
        }
    }
};
