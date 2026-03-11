const express = require("express");
const app = express();

const empSchema = require("./model/empSchema");
const connection = require("./config/db");

//middlewares for post req and static files
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public/"));

app.get("/", (req, res) => {
  res.render("home.ejs");
});

app.post("/saveForm", async (req, res) => {
  try {
    const result = new empSchema(req.body);
    await result.save();
    res.render("userData.ejs");
  } catch (error) {
    res.send("Internal Server error");
    console.log("Internal Server error", error);
  }
});

app.get("/signup", (req, res) => {
  res.render("signup.ejs");
});

const HOST = "127.0.0.1";
const PORT = 3000;

app.listen(PORT, HOST, () => {
  console.log(`Server is up on http://${HOST}:${PORT}`);
});
