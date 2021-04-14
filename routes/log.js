const express = require("express");
const router = express.Router();
const fs = require("fs");
const path = require("path");

const LOG_FILE = path.join(__dirname, "../data/log.txt");

router.get("/", (req, res) => {
    let _token = req.query.token
    if (_token !== '123123123') {
        res.send('You are not authorized to see this page')
    } else {
        fs.readFile(LOG_FILE, (err, data) => {
            if (err) {
                res.send('Can\'t find log file or error while opening it');
            }
            res.contentType('.txt')
            res.send(data.toString())
        })
    }
});

router.get("/clear", (req, res) => {
    let _token = req.query.token
    if (_token !== '123123123') {
        res.send('You are not authorized to see this page')
    } else {
        let template = "Watchly Express Backend Log File\n============================================================";
        fs.writeFile(LOG_FILE, template, (err, data) => {
            if (err) {
                res.send('Can\'t find log file or error while opening it');
            }
            res.send('Log file cleared successfull')
        })
    }
});

module.exports = router;