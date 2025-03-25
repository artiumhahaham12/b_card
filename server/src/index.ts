/* import express, { Request, Response } from "express";
import {router}  from "./routes/cards";
import

const app = express();
const port = "8000";



app.get("/", (req:Request, res:Response) => {
  res.send("Hello World!");
  console.log("Response sent");
});

app.use(express.json());
app.use(cors())
app.use("/cards", router);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
  
  
}); */