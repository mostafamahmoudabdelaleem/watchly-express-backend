const express = require("express");
const router = express.Router();
const fs = require("fs");
const path = require("path");
const logger = require("../logger");

const RAMADAN_FILE = path.join(__dirname, "../data/ramdan2021.json");

let moviesData = require(RAMADAN_FILE);

router.get("/", (req, res) => {
  res.json(moviesData);
});

router.post("/", (req, res) => {
  let data = req.body;
  let movies = {
    count: data.length,
    data,
    updated_at: new Date().toUTCString(),
  };

  fs.writeFile(RAMADAN_FILE, JSON.stringify(movies), (err) => {
    if (err) {
      logger.log("error while updating ramadan data");
      logger.log(err.message);
      res.json({
        err_msg: err.message,
        err: true,
      });
    } else {
      moviesData = movies.data;
      logger.log(`Ramadan list updated successfully at ${movies.updated_at}`);
      res.json({
        err_msg: null,
        err: false,
      });
    }
  });
});

module.exports = router;
