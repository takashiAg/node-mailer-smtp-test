const express = require("express");
const morgan = require("morgan");
const helmet = require("helmet");
const cors = require("cors");
var bodyParser = require("body-parser");

require("dotenv").config();

const middlewares = require("./middlewares");
const api = require("./api");

const app = express();

// parse application/x-www-form-urlencoded application/json
app.use(bodyParser.urlencoded());
app.use(bodyParser.json());

app.use(morgan("dev"));
app.use(helmet());
app.use(cors());
app.use(express.json());

app.use("/api/v1", api);
app.use("/", api);

app.use(middlewares.notFound);
app.use(middlewares.errorHandler);

module.exports = app;
