const express = require("express");
const app = express();

const session = require("express-session");

const authRoutes = require("./routes/authRoutes");
const userRoutes = require("./routes/userRoutes");

require("./config/db");

app.use(express.static("public/"));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(
  session({
    resave: false,
    saveUninitialized: false,
    secret: "vishwajitsecret",
  }),
);

app.use("/", authRoutes);
app.use("/user/", userRoutes);

const HOST = "127.1.1.0";
const PORT = 3000;

app.listen(PORT, HOST, () => {
  console.log(`http://${HOST}:${PORT}`);
});
