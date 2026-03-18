const express = require("express");
const app = express();
const bcrypt = require("bcryptjs");

app.use(express.static("public/"));
app.use(express.urlencoded({ extended: true }));

const connection = require("./config/db");
const userSchema = require("./model/userSchema");

const HOST = "127.0.0.1";
const PORT = 3000;

app.get("/", (req, res) => {
  res.render("login.ejs");
});

app.post("/login", async (req, res) => {
  const { userName, password } = req.body;
  if (!userName || !password) {
    return res.send(`<script>alert('All fields are mandetory')</script>`);
  }
  const isUserExists = await userSchema.findOne({ userName: userName });
  if (!isUserExists) {
    return res.send(
      ` <script>
    alert('User not found');
    window.location.href = "/";
  </script>`,
    );
  }
  const isMatchPassword = await bcrypt.compare(password, isUserExists.password);
  if (!isMatchPassword) {
    return res.send(
      ` <script>
    alert('Password wrong');
    window.location.href = "/";
  </script>`,
    );
  }
  if (isUserExists && isMatchPassword) {
    res.redirect("/dashboard");
  }
});

app.get("/dashboard", (req, res) => {
  res.render("dashboard.ejs");
});

app.get("/signup", (req, res) => {
  res.render("signup.ejs");
});

// ***********************************************
const multer = require("multer");
const storage = multer.diskStorage({
  destination: "public/uploads/",
  filename: (req, file, cb) => {
    cb(null, Date.now() + "_" + file.originalname);
  },
});
const upload = multer({ storage: storage });

// ***********************************************
app.post("/signup", upload.single("profile"), async (req, res) => {
  try {
    const { userName, userEmail, userPhone, password } = req.body;

    if (!userName || !userEmail || !userPhone || !password) {
      return res.send(`<script>alert('All fields are mandetory')</script>`);
    }
    const hashPassword = await bcrypt.hash(password, 10);

    const userData = {
      userName,
      userEmail,
      userPhone,
      password: hashPassword,
    };
    if (req.file) {
      userData.profile = req.file.filename;
    }
    const result = new userSchema(userData);
    await result.save();
    res.redirect("/");
  } catch (error) {
    res.send("Internal Server Error");
    console.log(error);
  }
});

app.listen(PORT, HOST, () => {
  console.log(`http://${HOST}:${PORT}`);
});
