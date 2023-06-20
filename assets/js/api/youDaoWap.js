async function lookupYouDaoWap(word) {
  let pageFather = $("#page");
  let url = options.youDaoWap.api + word;
  $.get(url, function (data) {
    pageFather.html("");
    pageFather.append($("<h1>" + word + "</h1>"));
    if (speak) {
      pageFather.append(getPhonetic(data, word));
    }
    pageFather.append(getParaphrase(data));
    pageFather.append(getTranslation(data));
    pageFather.append(getTransformation(data));
    setHeight();
  });
}

function getPhonetic(data, word) {
  //读音 英/美
  let regPhonetic =
    /英[\W\w]*?phonetic">([\W\w]*?)<\/span[\W\w]*?data-rel="([\W\w]*?)"[\W\w]*?美[\W\w]*?phonetic">([\W\w]*?)<\/span[\W\w]*?data-rel="([\W\w]*?)"/im;
  let phonetics = regPhonetic.exec(data);

  let phoneticDiv = $('<div class="pagePhonetic"></div>');

  // 多个读音
  if (phonetics != null) {
    let keyEnSpan = $("<span>英 " + phonetics[1] + "</span>");
    let keyUtSpan = $("<span>美 " + phonetics[3] + "</span>");

    let audioEn = $("<audio></audio>");
    audioEn.attr("src", phonetics[2]);
    let audioUt = $("<audio></audio>");
    audioUt.attr("src", phonetics[4]);

    let btnEn = $('<button type="button" class="pageBtn"></button>');
    btnEn.append(audioEn);
    let btnUt = $('<button type="button" class="pageBtn"></button>');
    btnUt.append(audioUt);

    addListener(btnEn);
    addListener(btnUt);
    phoneticDiv.append(keyEnSpan);
    phoneticDiv.append(btnEn);
    phoneticDiv.append(keyUtSpan);
    phoneticDiv.append(btnUt);
  } else {
    // 单个读音
    regPhonetic = /phonetic">([\W\w]*?)<\/span[\W\w]*?data-rel="([\W\w]*?)"/im;
    phonetics = regPhonetic.exec(data);
    if (phonetics != null) {
      let keySpan = $("<span>" + phonetics[1] + "</span>");
      let audio = $("<audio></audio>");
      audio.attr("src", phonetics[2]);
      let btn = $('<button type="button" class="pageBtn"></button>');
      btn.append(audio);
      addListener(btn);
      phoneticDiv.append(keySpan);
      phoneticDiv.append(btn);
    } else {
      let keyUkSpan = $("<span>英</span>");
      let keyUsSpan = $("<span>美</span>");

      let audioUk = $("<audio></audio>");
      audioUk.attr("src", ttsApi + word + "&type=1");
      let audioUs = $("<audio></audio>");
      audioUs.attr("src", ttsApi + word + "&type=2");

      let btnUk = $('<button type="button" class="pageBtn"></button>');
      btnUk.append(audioUk);
      let btnUs = $('<button type="button" class="pageBtn"></button>');
      btnUs.append(audioUs);

      addListener(btnUk);
      addListener(btnUs);
      phoneticDiv.append(keyUkSpan);
      phoneticDiv.append(btnUk);
      phoneticDiv.append(keyUsSpan);
      phoneticDiv.append(btnUs);
    }
  }
  return phoneticDiv;
}

function addListener(element) {
  // Convert to HTML DOM.
  let btn = element[0];
  btn.onmouseover = function () {
    btn.children[0].play();
  };
}

function getParaphrase(data) {
  const regParaphrase = /_contentWrp"[\W\w]*<ul>([\W\w]*?)<\/ul/im;
  let paraphrases = regParaphrase.exec(data);
  let paraphraseDiv = $("<div></div>");
  if (paraphrases != null) {
    let paraphraseTitle = $("<h2>释义</h2>");
    let paraphraseList = $("<ul>" + filterATag(paraphrases[1]) + "</ul>");
    paraphraseDiv.append(paraphraseTitle);
    paraphraseDiv.append(paraphraseList);
  }
  return paraphraseDiv;
}

function filterATag(msg) {
  var msg = msg.replace(/<a[\W\w]*?>/gim, "");
  msg = msg.replace("</a>", "");
  return msg;
}

function getTranslation(data) {
  const regTranslation =
    /fanyi_contentWrp"[\W\w]*?翻译结果[\W\w]*?trans-container[\W\w]*?<p>[\W\w]*?<\/p>([\W\w]*?)<\/p>/im;
  let translations = regTranslation.exec(data);
  let translationDiv = $("<div></div>");
  if (translations != null) {
    let translationTitle = $("<h2>翻译</h2>");
    let translationList = $("<ul><li>" + translations[1] + "</li></ul>");
    translationDiv.append(translationTitle);
    translationDiv.append(translationList);
  }
  return translationDiv;
}

/**
 * Get the transformation element.
 * @param {String} data the response html string.
 * @returns the transformation element.
 */
function getTransformation(data) {
  const regTransformation = /_contentWrp"[\W\w]*<div class="sub">([\W\w]*?)<\/div/im;
  let transformations = regTransformation.exec(data);
  let transformationDiv = $("<div></div>");
  if (!transformations || transformations.length < 2) {
    return transformationDiv;
  }
  let divContent = filterATag(transformations[1]);
  let temp = $("<div></div>");
  temp.html(divContent);
  let ps = temp.find("p");
  if (ps.length < 1) {
    return transformationDiv;
  }

  let transformationTitle = $("<h2>变形</h2>");
  transformationDiv.append(transformationTitle);
  let transformationList = $("<ul></ul>");
  for (let i = 0; i < ps.length; i++) {
    let content = $(ps[i]).text().trim();
    let transformationLi = $("<li>" + content + "</li>");
    transformationList.append(transformationLi);
  }
  transformationDiv.append(transformationList);
  return transformationDiv;
}

function setHeight() {
  let height = document.body.offsetHeight;
  height = height > maxHeight ? maxHeight : height;
  utools.setExpendHeight(height);
}
