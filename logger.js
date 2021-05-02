const fs = require("fs");
const path = require("path");
const { version } = require("./package.json");

const LOG_FILE = path.join(__dirname, "./data/log.txt");

class Logger {
  log(msg) {
    let time = new Date().toUTCString();
    let log_msg = `[v${version}@${time}]: ${msg}\n`;
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
    fs.writeFile(LOG_FILE, '', callback)
  }
}

module.exports = new Logger();
