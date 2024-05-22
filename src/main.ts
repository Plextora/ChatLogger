const fs = require("filesystem");

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

export {}; // Leave this here to fix name conflicts
