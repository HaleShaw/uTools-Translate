async function lookupDeepSeek(word) {
  let data = [];

  let deepSeekAPIKey = utools.dbStorage.getItem("deepSeekAPIKey");
  if (!deepSeekAPIKey) {
    data.push({
      title: errTitle,
      description: errMsgEmptyConf,
    });
    return data;
  }
  let deepSeekModel = utools.dbStorage.getItem("deepSeekModel");
  if (!deepSeekModel) {
    deepSeekModel = "deepseek-chat";
    utools.dbStorage.setItem("deepSeekModel", deepSeekModel);
  }
  let deepSeekPrompt = utools.dbStorage.getItem("deepSeekPrompt");
  if (!deepSeekPrompt) {
    deepSeekPrompt = DEFAULT_PROMPT;
    utools.dbStorage.setItem("deepSeekPrompt", deepSeekPrompt);
  }

  const config = {
    url: options.deepSeek.api + options.deepSeek.path,
    APIKey: deepSeekAPIKey,
    model: deepSeekModel,
    prompt: deepSeekPrompt,
  };
  data = await handleAPITranslation(word, config);
  return data;
}
