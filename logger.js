const fs = require("fs");
const path = require("path");
const { version } = require("./package.json");

const LOG_FILE = path.join(__dirname, "./data/log.txt");

class Logger {
  log(msg) {
    let time = new Date().toUTCString();
    let log_msg = `\n[v${version}@${time}]: ${msg}`;
    fs.appendFile(LOG_FILE, log_msg, (err) => {
      if (err) console.log(err)
    })
  }

  logRequest(req) {
    let time = new Date().toUTCString();
    console.log(
      `[v${version}@${time}]: url:<${req.originalUrl}> method:<${req.method}> ip:<${req.ip}>`
    );
  }

  clearLogFile(callback) {
    let template = "Watchly Express Backend Log File\n============================================================";
    fs.writeFile(LOG_FILE, template, callback)
  }
}

module.exports = new Logger();
