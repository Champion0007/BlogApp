const express = require("express");
const app = express();

const path = require("path");

const Port = process.env.PORT || 8000;

app.set("view engine", "ejs");
app.set("views", path.resolve("./views"));

app.get("/", (req, res) => {
  res.render("home");
});

app.listen(Port, () => {
  console.log(`Server listing on Port ${Port}`);
});
