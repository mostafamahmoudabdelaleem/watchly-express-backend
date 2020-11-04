const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const logger = require("./logger");

const moviesRouter = require("./routes/movies");
const seriesRouter = require("./routes/series");

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

//Redirect default entry to watchly.tk
app.get("*", (req, res) => {
  res.redirect("https://watchly.tk");
});

//Serve App
app.listen(port, () => {
  logger.log(`Started at Port ${port}`);
  logger.log(`Live at http://localhost:${port}/api`);
});
