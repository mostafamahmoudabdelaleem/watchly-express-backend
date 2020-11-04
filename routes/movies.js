const express = require("express");
const router = express.Router();
const fs = require("fs");
const path = require("path");
const logger = require("../logger");

const MOVIES_FILE = path.join(__dirname, "../data/movies.json");

let moviesData = require(MOVIES_FILE).data;

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

  fs.writeFile(MOVIES_FILE, JSON.stringify(movies), (err) => {
    if (err) {
      logger.log("error while updating movies");
      logger.log(err.message);
      res.json({
        err_msg: err.message,
        err: true,
      });
    } else {
      moviesData = movies.data;
      logger.log(`Movies list updated successfully at ${movies.updated_at}`);
      res.json({
        err_msg: null,
        err: false,
      });
    }
  });
});

module.exports = router;
