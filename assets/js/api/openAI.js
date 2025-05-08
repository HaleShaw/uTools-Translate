async function lookupOpenAI(word) {
  let data = [];

  let openAIURL = utools.dbStorage.getItem("openAIURL");
  let openAIModel = utools.dbStorage.getItem("openAIModel");
  let openAIAPIKey = utools.dbStorage.getItem("openAIAPIKey");
  let openAIPrompt = utools.dbStorage.getItem("openAIPrompt");
  if (!openAIAPIKey || !openAIModel) {
    data.push({
      title: errTitle,
      description: errMsgEmptyConf,
    });
    return data;
  }

  if (!openAIPrompt) {
    openAIPrompt = DEFAULT_PROMPT;
    utools.dbStorage.setItem("openAIPrompt", openAIPrompt);
  }

  const url = !openAIURL ? options.openAI.api : openAIURL;
  const config = {
    url: url,
    APIKey: openAIAPIKey,
    model: openAIModel,
    prompt: openAIPrompt,
  };
  data = await handleAPITranslation(word, config);
  return data;
}
