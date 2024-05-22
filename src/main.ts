const fs = require("filesystem");
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

let formatString = "MM/DD/YYYY, hh:mm:ss A";

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
        `${ev.sender} - ${moment().format(formatString)} - ${ev.message}`
      );
    } else {
      logToFile(`${moment().format(formatString)} - ${ev.message}`);
    }
  }
});

client.getModuleManager().registerModule(module);

export {}; // Leave this here to fix name conflicts
