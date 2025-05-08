// 供OpenAI架构调用的AI公共方法
async function handleAPITranslation(word, config) {
  const data = [];
  const { url, APIKey, model, prompt } = config;

  // 获取语言配置
  const langSource = isChinese(word) ? "zh-CN" : "en";
  const langTarget = langSource === "en" ? "zh-CN" : "en";

  try {
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${APIKey}`
      },
      body: JSON.stringify({
        model: model,
        messages: [
          { role: "system", content: prompt },
          { role: "user", content: word }
        ]
      })
    });

    // 统一处理响应
    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(`API Error: ${response.status} - ${errorData.message || 'Unknown error'}`);
    }

    const resData = await response.json();
    const translation = resData.choices?.[0]?.message?.content;
    if (!translation) throw new Error("Invalid response structure");

    // 构建返回结果
    const phoneticHtml = getPhoneticHtml(word, translation, langSource, langTarget);
    data.push({
      title: `<span class="translation">${translation}</span>${phoneticHtml}`,
      description: "基本释义"
    });
  } catch (error) {
    console.error(error);
    data.push({
      title: errTitle,
      description: "翻译错误，可进入设置页面切换其他API"
    });
  }

  return data;
}
