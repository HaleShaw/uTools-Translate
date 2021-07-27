const MouseTrap = require("./assets/mousetrap.min");
const setting = require("./assets/setting");
const youDaoOld = require("./assets/youDaoOld");
const youDao = require("./assets/youDao");

var height;

async function lookUp(word) {
  let option = utools.dbStorage.getItem("option");
  if (!option || option.error) {
    option = Object.keys(setting.options)[0];
    utools.dbStorage.setItem("option", option);
  }
  let data = [];
  switch (option) {
    case Object.keys(setting.options)[0]:
      data = await youDaoOld.lookupYouDaoOld(word);
      break;
    case Object.keys(setting.options)[1]:
      data = await youDao.lookupYouDao(word);
      break;
    case Object.keys(setting.options)[2]:
      break;
    default:
      break;
  }
  return data;
}

MouseTrap.bind("ctrl+t", () => {
  height = document.documentElement.clientHeight;
  console.log(setting.options);
  setting.open(height);
  utools.subInputBlur();
});

window.exports = {
  lookup: {
    mode: "list",
    args: {
      enter: (action, callbackSetList) => {
        let word = action.payload.trim();
        const type = action.type;
        if (type == "over" || type == "regex") {
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

        // Do search while the setting window is not closed.
        let msg = document.getElementById("msg");
        if (msg) {
          msg.innerText = " ";
        }
        let settingEle = document.getElementById("setting");
        if (settingEle && settingEle.style.display != "none") {
          settingEle.style.display = "none";
          let rawRoot = document.getElementById("root");
          rawRoot.style.display = "block";
          utools.setExpendHeight(height);
          utools.subInputFocus();
        }
        lookUp(word).then(data => {
          callbackSetList(data);
        });
      },
      select: (action, itemData) => {
        window.utools.copyText(itemData.title);
        window.utools.hideMainWindow();
        window.utools.outPlugin();
      },
      placeholder: "请输入需要查询的中英文内容        设置(Ctrl+T)"
    }
  }
};
