const fs = require("filesystem");
const clipboard = require("clipboard");
const http = require("http");
if (!fs.exists("./moment.js")) {
  let response = http.get("https://momentjs.com/downloads/moment.js");
  fs.write("./moment.js", response.body);
}
const moment = require("./moment.js");

const module: Module = new Module(
  "ChatLogger",
  "Chat Logger",
  "Logs all chat messages to a file (adapted from Eclipse's EventLogger)",
  KeyCode.None
);

const formatString = module.addTextSetting(
  "ChangeFormatString",
  "Change Format String",
  "Changes the formatting of the timestamp in logs. Type command .formatstringinfo for more info",
  "MM/DD/YYYY, hh:mm:ss A"
);

const formatStringInfo: Command = new Command(
  "formatstringinfo",
  "Info on format strings and moment.js documentation",
  "$",
  []
);

fs.write(
  `chatlog-${moment().format("YYYY-MM-DD")}.log`,
  util.stringToBuffer("")
); // initializes file

function logToFile(text: string) {
  if (fs.exists(`chatlog-${moment().format("YYYY-MM-DD")}.log`)) {
    // append to file
    fs.append(
      `chatlog-${moment().format("YYYY-MM-DD")}.log`,
      util.stringToBuffer(text.concat("\n"))
    );
  } else {
    // attempt to initalize file again because im assuming the user
    // at this point has spent 24+ hours ingame so we need to make
    // another file (i have not tested this)
    fs.write(
      `chatlog-${moment().format("YYYY-MM-DD")}.log`,
      util.stringToBuffer("")
    );
    return;
  }
}

client.on("receive-chat", (ev) => {
  if (ev.isChat && module.isEnabled()) {
    if (ev.sender !== "") {
      logToFile(
        `${ev.sender} - ${moment().format(formatString.getValue())} - ${
          ev.message
        }`
      );
    } else {
      logToFile(`${moment().format(formatString.getValue())} - ${ev.message}`);
    }
  }
});

formatStringInfo.on(
  "execute",
  (label: string, args: string[], commandLine: string) => {
    if (args.length > 0) {
      return false;
    }
    clientMessage(
      decodeURI(
        "\u00A7eHere's an example for format strings you can use in ChatLogger:"
      )
    );
    clientMessage(
      decodeURI(
        // decoded: &9YYYY&r-&bMM&r&a-DD&r = &c2024-5-22
        "\u00A7r\n\u00A79\u00A7lYYYY\u00A7r-\u00A7bMM\u00A7r\u00A7a-DD\u00A7r = \u00A7c2024-5-22"
      )
    );
    clipboard.set("https://momentjs.com/docs/#/parsing/string-format/");
    clientMessage(
      decodeURI(
        "\u00A7eMore info for this is on https://momentjs.com/docs/#/parsing/string-format/ (copied to your clipboard)"
      )
    );
    clientMessage(
      decodeURI(
        "\u00A7eYou can basically represent almost any time format you want with this"
      )
    );

    return true;
  }
);

client.getModuleManager().registerModule(module);
client.getCommandManager().registerCommand(formatStringInfo);

export {}; // Leave this here to fix name conflicts
