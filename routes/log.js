const express = require("express");
const router = express.Router();
const fs = require("fs");
const path = require("path");

const LOG_FILE = path.join(__dirname, "../data/log.txt");

router.get("/", (req, res) => {
    fs.readFile(LOG_FILE, (err, data) => {
        if(err){
            res.send('Can\'t find log file or error while opening it');
        }
        res.contentType('txt')
        res.send(data.toString())
    })
});