const express = require("express");
const app = express();
const url = require("url");

app.get("/", (req, res) => {
  res.render("home.ejs");
});

app.get("/signup", (req, res) => {
  res.render("signup.ejs");
});

app.get("/dashboard", (req, res) => {
  let url_data = url.parse(req.url, true);
  let obj = url_data.query;

  res.render("dashboard.ejs", { obj });
});

app.use((req, res) => {
  res.send("<h1>404, Page Not Found</h1>");
});

const PORT = 3000;
const HOST = "127.0.0.1";

app.listen(PORT, HOST, () => {
  console.log(`Server is running on ... http://${HOST}:${PORT}`);
});
