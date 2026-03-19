const express = require("express");
const app = express();
const bcrypt = require("bcryptjs");

app.use(express.static("public/"));
app.use(express.urlencoded({ extended: true }));

const connection = require("./config/db");
const userSchema = require("./model/userSchema");
const postSchema = require("./model/postSchema");
const storySchema = require("./model/storySchema");

const HOST = "127.1.1.0";
const PORT = 3000;

const session = require("express-session");
app.use(
  session({
    resave: false,
    saveUninitialized: false,
    secret: "vishwajitsecret",
  }),
);

app.get("/", (req, res) => {
  res.render("login.ejs");
});

app.get("/addStory", async (req, res) => {
  res.send("addStory.ejs");
});

app.get("/dashboard", async (req, res) => {
  try {
    if (!req.session.loginID) {
      return res.send(
        `<script>alert('Session expired!!'); window.location.assign('/')</script>`,
      );
    }
    const posts = await postSchema.find().populate("userId");
    const stories = await storySchema.find();
    const result = await userSchema.findById(req.session.loginID);
    const obj = { data: result, posts: posts, stories: stories };
    res.render("dashboard.ejs", obj);
  } catch (error) {
    res.send("Internal server error");
    console.log(error);
  }
});

app.post("/login", async (req, res) => {
  try {
    const { username, password } = req.body;
    if (!username || !password) {
      return res.send(
        `<script>alert('All fields are mandatory!!'); window.location.assign('/')</script>`,
      );
    }
    const isUserExists = await userSchema.findOne({ username: username });
    if (!isUserExists) {
      return res.send(
        `<script>alert('User not found!'); window.location.assign('/')</script>`,
      );
    }
    const isPassMatch = await bcrypt.compare(password, isUserExists.password);
    if (!isPassMatch) {
      return res.send(
        `<script>alert('Wrong password!'); window.location.assign('/')</script>`,
      );
    }
    if (isUserExists && isPassMatch) {
      req.session.loginID = isUserExists._id;
      return res.send(
        `<script>alert('Logged in successfully!'); window.location.assign('/dashboard')</script>`,
      );
    }
  } catch (error) {
    res.send("Internal Server Error");
    console.log(error);
  }
});

app.get("/signup", (req, res) => {
  res.render("signup.ejs");
});

const multer = require("multer");
const storage = multer.diskStorage({
  destination: "public/uploads/",
  filename: (req, file, cb) => {
    cb(null, Date.now() + "_" + file.originalname);
  },
});
const upload = multer({ storage: storage });

app.post("/signup", upload.single("profile"), async (req, res) => {
  try {
    const { name, email, username, phone, password } = req.body;
    if (!name || !email || !username || !phone || !password) {
      return res.send("All fields are mandatory!!");
    }
    const hashPassword = await bcrypt.hash(password, 10);
    const userData = { name, email, username, phone, password: hashPassword };
    if (req.file) {
      userData.profile = req.file.filename;
    }
    const result = new userSchema(userData);
    await result.save();
    return res.send(
      `<script>alert('Registered Successfully'); window.location.assign('/')</script>`,
    );
  } catch (error) {
    res.send("Internal Server Error");
    console.log(error);
  }
});

app.post("/addStory", upload.single("story"), async (req, res) => {
  try {
    const userId = req.session.loginID;
    const { caption } = req.body;
    const story = req.file.filename;
    if (!caption || !story) {
      return res.send(
        `<script>alert('All Fields are mandatory!!'); window.location.assign('/dashboard')</script>`,
      );
    }
    const result = new storySchema({ caption, story, userId });
    await result.save();
    return res.send(
      `<script>alert('Story uploaded!!'); window.location.assign('/dashboard')</script>`,
    );
  } catch (error) {
    res.send("Internal Server Error");
    console.log(error);
  }
});

app.post("/addPost", upload.single("post"), async (req, res) => {
  try {
    const userId = req.session.loginID;
    const post = req.file.filename;
    const { title, caption } = req.body;
    if ((!title, !caption)) {
      return res.send(
        `<script>alert('All Fields are mandatory!!'); window.location.assign('/dashboard')</script>`,
      );
    }
    const result = new postSchema({ title, caption, post, userId });
    await result.save();
    return res.send(
      `<script>alert('Post uploaded!'); window.location.assign('/dashboard')</script>`,
    );
  } catch (error) {
    res.send("Internal Server Error");
    console.log(error);
  }
});

app.get("/logout", (req, res) => {
  req.session.destroy;
  return res.send(
    `<script>alert('Logout Successfully'); window.location.assign('/')</script>`,
  );
});
app.listen(PORT, HOST, () => {
  console.log(`http://${HOST}:${PORT}`);
});
