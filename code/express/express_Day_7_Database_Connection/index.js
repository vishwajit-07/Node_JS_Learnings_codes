const express = require("express");
const app = express();

// adding middleware for post method
app.use(express.urlencoded({ extended: true }));

//Database connection
const connection = require("./config/db.js");

app.get("/", (req, res) => {
  res.render("home.ejs");
});

app.get("/signup", (req, res) => {
  res.render("signup.ejs");
});

app.post("/saveForm", (req, res) => {
  const users = { data: req.body };
  res.render("userData.ejs", users);
});

const PORT = 3000;
const HOST = "127.0.0.1";

app.listen(PORT, HOST, () => {
  console.log(`http://${HOST}:${PORT}`);
});
