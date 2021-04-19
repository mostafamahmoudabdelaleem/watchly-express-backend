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
    logger.log("Update request with empty body");
    res.json({
      err_msg: 'Empty Body',
      err: true,
    });
  }

  let toAppend = [];
  let updateCount = 0;
  data.forEach((item, i) => {
    let _index = LIST_DATA.findIndex(val => val['id'] === item['id'])
    if (_index === -1) {
      toAppend.push(item)
    } else {
      if (Object.keys(LIST_DATA[_index]['sources_links']).length < Object.keys(item['sources_links']).length) {
        LIST_DATA[_index] = item;
        updateCount++
      }
    }
  });
  
  if (updateCount > 0) { logger.log(`Updated items count => ${updateCount}`); }

  if (toAppend.length > 0) {
    let newList = toAppend.concat(LIST_DATA)
    logger.log(`List old size = ${LIST_DATA.length}`);

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
        logger.log(`List new size = ${LIST_DATA.length}`);
        logger.log(`Ramadan list updated successfully`);
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

router.get("/status", (req, res) => {
  let _token = req.query.token
  if (_token !== '123123123') {
    res.json({
      err: 'You are not authorized to see this page'
    })
  } else {
    res.json({
      status: `Current list size = ${LIST_DATA.length}`
    })
  }
});

module.exports = router;
