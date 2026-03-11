const express = require("express");
const app = express();

//middlewares for post method and static file serve
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public/"));

//imports the db and model schema
const connection = require("./config/db");
const userSchema = require("./model/userSchema");

app.get("/", (req, res) => {
  res.render("register.ejs");
});

app.get("/dashboard", (req, res) => {
  res.render("dashboard.ejs");
});

app.get("/userData", async (req, res) => {
  try {
    const result = await userSchema.find();
    const obj = { data: result };
    res.render("userData.ejs", obj);
  } catch (error) {
    res.send("<h2>Internal Server Error</h2>");
    console.log(error);
  }
});

app.post("/saveUser", async (req, res) => {
  try {
    const result = new userSchema(req.body);
    await result.save();
    res.redirect("/userData");
  } catch (error) {
    res.send("<h2>Internal server Error</h2>");
    console.log(error);
  }
});

app.get("/delete/:id", async (req, res) => {
  try {
    const id = req.params.id;
    await userSchema.findByIdAndDelete(id);
    res.redirect("/userData");
  } catch (error) {
    res.send("<h2>Internal Server Error</h2>");
    console.log(error);
  }
});

app.use((req, res) => {
  res.render("404.ejs");
});

const HOST = "127.0.0.1";
const PORT = 3000;
app.listen(PORT, HOST, () => {
  console.log(`Server is up on http://${HOST}:${PORT}`);
});
