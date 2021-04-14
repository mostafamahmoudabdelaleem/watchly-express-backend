const express = require("express");
const router = express.Router();
const fs = require("fs");
const path = require("path");
const logger = require("../logger");

const RAMADAN_FILE = path.join(__dirname, "../data/ramdan2021.json");

let LIST_DATA = require(RAMADAN_FILE);

router.get("/", (req, res) => {
  res.json(LIST_DATA);
});

router.post("/", (req, res) => {
  let data = req.body;
  if (data === null || data.length < 1) {
    res.json({
      err_msg: 'Empty Body',
      err: true,
    });
  }

  let toAppend = [];
  data.forEach((item, i) => {
    let _index = LIST_DATA.findIndex((val) => val['name'] === item['name'])
    if (_index != -1) {
      toAppend.push(item)
    }
  });

  if (toAppend.length > 1) {
    let newList = toAppend.concat(LIST_DATA)

    fs.writeFile(RAMADAN_FILE, JSON.stringify(newList), (err) => {
      if (err) {
        logger.log("error while updating ramadan data");
        logger.log(err.message);
        res.json({
          err_msg: err.message,
          err: true,
        });
      } else {
        LIST_DATA = newList;
        logger.log(`Ramadan list updated successfully at ${new Date().toUTCString()}`);
        res.json({
          err_msg: null,
          err: false,
        });
      }
    });
  } else {
    res.json({
      err_msg: 'No new item to add',
      err: true,
    });
  }
});

module.exports = router;
