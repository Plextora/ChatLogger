const fs = require("filesystem");

const module: Module = new Module(
  "ChatLogger",
  "Chat Logger",
  "Logs all chat messages to a file (adapted from Eclipse's EventLogger)",
  KeyCode.None
);

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
    logToFile(ev.message);
  }
});

export {}; // Leave this here to fix name conflicts
