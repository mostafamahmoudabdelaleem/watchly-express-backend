const fs = require("fs");
const path = require("path");
const { name, version } = require("./package.json");

const LOG_FILE = path.join(__dirname, "./data/log.txt");

class Logger {
  log(msg) {
    let time = new Date().toUTCString();
    let log_msg = `[${name}v${version}@${time}]: ${msg}`;
    fs.appendFile(LOG_FILE, log_msg, (err) => {
      if (err) console.log(err)
    })
  }

  logRequest(req) {
    let time = new Date().toUTCString();
    console.log(
      `[${name}v${version}@${time}]: url:<${req.originalUrl}> method:<${req.method}> ip:<${req.ip}>`
    );
  }
}

module.exports = new Logger();
