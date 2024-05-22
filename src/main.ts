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

let formatString = "MMMM DD, YYYY, hh:mm:ss A";

fs.write("log.txt", util.stringToBuffer("")); // initializes file

function logToFile(text: string) {
  if (fs.exists("log.txt")) {
    // append to file
    fs.append("log.txt", util.stringToBuffer(text.concat("\n")));
  } else {
    client.showNotification(
      "ChatLogger: Something went horribly wrong when attempting to log"
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
