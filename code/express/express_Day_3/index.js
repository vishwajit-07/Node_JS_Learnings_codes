const express = require("express");
const app = express();

app.get("/", (req, res) => {
  const obj = {
    name: "Vishwajit",
    email: "vishwajitmavalankar54339@gmail.com",
    contact: 7741839179,
  };
  res.render("home.ejs", { obj });
});

const PORT = 3000;
const HOST = "127.0.0.1";

app.listen(PORT, HOST, () => {
  console.log(`Server is up on http://${HOST}:${PORT}`);
});
