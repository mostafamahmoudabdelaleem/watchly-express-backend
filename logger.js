const { name, version } = require("./package.json");

class Logger {
  log(msg) {
    console.log(`[${name}@${version}]: ${msg}`);
  }

  logRequest(req) {
    console.log(
      `[${name}@${version}]: url:<${req.originalUrl}> method:<${req.method}> ip:<${req.ip}>`
    );
  }
}

module.exports = new Logger();
