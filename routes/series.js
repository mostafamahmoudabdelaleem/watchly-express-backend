const express = require("express");
const router = express.Router();
const fs = require("fs");
const path = require("path");
const logger = require("../logger");

const SERIES_FILE = path.join(__dirname, "../data/series.json");

let seriesData = require(SERIES_FILE);

router.get("/", (req, res) => {
  res.json(seriesData);
});

router.post("/", (req, res) => {
  let data = req.body;
  let series = {
    count: data.length,
    data,
    updated_at: new Date().toUTCString(),
  };

  fs.writeFile(SERIES_FILE, JSON.stringify(series), (err) => {
    if (err) {
      logger.log("error while updating series");
      logger.log(err.message);
      res.json({
        err_msg: err.message,
        err: true,
      });
    } else {
      seriesData = series.data;
      logger.log(`Series list updated successfully at ${series.updated_at}`);
      res.json({
        err_msg: null,
        err: false,
      });
    }
  });
});

module.exports = router;
