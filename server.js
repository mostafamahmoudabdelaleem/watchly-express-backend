const express = require("express");
const path = require("path");
const cors = require("cors");
const bodyParser = require("body-parser");
const logger = require("./logger");

const moviesRouter = require("./routes/movies");
const seriesRouter = require("./routes/series");
const ramadanRouter = require("./routes/ramdan");
const logRouter = require('./routes/log');

//App configs
const app = express();
const port = process.env.PORT || 5000;

//Enable CORS
app.use(cors());

// uses body-parser middelware
app.use(bodyParser.json());
app.use((req, res, next) => {
  logger.logRequest(req);
  next();
});

//App Routes
app.use("/api/movies/", moviesRouter);
app.use("/api/series/", seriesRouter);
app.use("/api/ramadan/", ramadanRouter);
app.use("/api/log/", logRouter);

app.use('/imgs', express.static(path.join(__dirname, 'static/imgs')));
app.get("/log", (req, res) => {
  res.sendFile(path.join(__dirname, './static/pages/log.html'));
})

//Redirect default entry to watchly.tk
app.get("*", (req, res) => {
  res.redirect("https://watchly.tk");
});

//Serve App
app.listen(port, () => {
  logger.clearLogFile((err) => {
    if (err) {
      console.log('Can\'t find log file or error while opening it');
    }
    console.log('Log file cleared successfull')
  })
  logger.log(`Started at Port ${port}`);
});
