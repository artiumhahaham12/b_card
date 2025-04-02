const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const listOfRoutes = require("express-list-routes");
require("dotenv").config({
  path: process.env.NODE_ENV === "production" ? ".env.production" : ".env.dev",
});

//import routes
const cards = require("./routes/cards");
const login = require("./routes/login");
const users = require("./routes/users");
const mongoose = require("mongoose");
const logger = require("./utils/logger");

const app = express();
const port = process.env.PORT || 8000;

//connect mongo
mongoose
  .connect(process.env.MONGODB)
  .then(() => console.log("connected to mongo"))
  .catch((error) => console.log(error));

//morgan set
morgan.token("full-url", (req) => {
  return `${req.protocol}://${req.get("host")}${req.originalUrl}`;
});

morgan.token("time", () => {
  return new Date().toLocaleTimeString(); // Время в формате ISO 8601
});
//catch errors to file .log
app.use((req, res, next) => {
  const originalSend = res.send;
  res.send = function (body) {
    if (res.statusCode >= 400) {
      logger.error(`error ${res.statusCode}: ${req.method} - ${body}`);
    }
    return originalSend.apply(res, arguments);
  };
  next();
});
//app set
app.use(express.json());
app.use(cors());
app.use(morgan(":method :full-url :status :response-time ms :time"));

//routes
app.use("/api/cards", cards);
app.use("/api/login", login);
app.use("/api/users", users);

//create list of endpoints that app have
listOfRoutes(app);

app.listen(port, () => {
  console.log(`server started run on ${port}`);
});
