const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const listOfRoutes = require("express-list-routes")
//import routes
const cards = require("./routes/cards")
const register = require("./routes/register")
const login = require("./routes/login")
const users = require("./routes/users")

require("dotenv").config();
const morgan = require("morgan");



const app = express();
const port = process.env.PORT || 8000;
//connect mongo
mongoose.connect(process.env.MONGODB)
.then(() => console.log("connected to mongo"))
  .catch((error) => console.log(error));
  
  //morgan set
morgan.token("full-url", (req) => {
  return `${req.protocol}://${req.get("host")}${req.originalUrl}`;
});
morgan.token("time", () => {
  return new Date().toLocaleTimeString(); // Время в формате ISO 8601
});
//app set
app.use(express.json());
app.use(cors());
app.use(morgan(":method :full-url :status :response-time ms :time"))

//routes use
app.use("/api/cards", cards);
app.use("/api/register", register);
app.use("/api/login", login);
app.use("/api/users", users);
//main methods
app.get("/api", (req,res) => {
  res.status(200).send("hi");
})

listOfRoutes(app);

app.listen(port, () => {
    console.log(`server started run on ${port}`);
})