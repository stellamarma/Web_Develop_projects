import express from "express";
import bodyParser from "body-parser";
import { localsName } from "ejs";

const app = express();
const port = 3000;

app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.render("index.ejs");
});

app.post("/submit", (req, res) => {
  const fullName=req.body["fname"] +req.body["lName"];
  const fullNameNum=fullName.length;
  res.render("index.ejs", { fullNameNum});
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
