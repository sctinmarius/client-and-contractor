const express = require("express");
const helmet = require("helmet");
const bodyParser = require("body-parser");
const { sequelize } = require("./model");
const { getProfile } = require("./middleware/getProfile");
const { getRoutes } = require("./routes");
const { errorMiddleware } = require("./middleware/errorMiddleware");

const app = express();
app.use(helmet());
app.use(bodyParser.json());
app.set("sequelize", sequelize);
app.set("models", sequelize.models);
app.use(getProfile);
app.use("/", getRoutes());
app.use(errorMiddleware);

module.exports = app;
