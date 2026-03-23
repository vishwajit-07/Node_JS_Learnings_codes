const express = require("express");
const app = express();
const bcrypt = require("bcryptjs");

app.use(express.static("public/"));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

const connection = require("./config/db");
const userSchema = require("./model/userSchema");
const postSchema = require("./model/postSchema");
const storySchema = require("./model/storySchema");
const sendMail = require("./sendMail");

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

// **************************************************************************************************
//login traditional username + password

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

//  **************************************************************************************************************

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
    const userData = { name, email, username, phone, password };
    if (req.file) {
      userData.profile = req.file.filename;
    }

    req.session.userData = userData;
    const otp = Math.floor(1000 + Math.random() * 9000);
    req.session.OTP = otp;

    sendMail(email, otp);
    req.session.OTP_EXPIRE = Date.now() + 2 * 60 * 1000;

    res.redirect("/otppage");

    // const hashPassword = await bcrypt.hash(password, 10);

    // const result = new userSchema(userData);
    // await result.save();
    // return res.send(
    //   `<script>alert('Registered Successfully'); window.location.assign('/')</script>`,
    // );

    // req.session.OTP_EXPIRE = Date.now() + 2 * 60 * 1000; // 2 minutes
  } catch (error) {
    res.send("Internal Server Error");
    console.log(error);
  }
});

app.get("/otppage", (req, res) => {
  res.render("otppage.ejs");
});

app.post("/otpverify", async (req, res) => {
  try {
    const expiry = req.session.OTP_EXPIRE;
    if (Date.now() > expiry) {
      return res.send(
        `<script>alert('OTP expired ⏱ Please request new one.');
        window.location.assign('/signup');</script>`,
      );
    }
    const { otpvalue } = req.body;
    const userenterd_otp = otpvalue.join("");

    if (userenterd_otp == req.session.OTP) {
      const { name, email, username, phone, password, profile } =
        req.session.userData;

      const hashPassword = await bcrypt.hash(password, 10);
      const result = new userSchema({
        name,
        email,
        username,
        phone,
        password: hashPassword,
        profile: profile || null,
      });
      await result.save();

      res.send(
        `<script>alert('Successfully Registered!!!');
      window.location.assign('/');
      </script>`,
      );
    } else {
      res.send(
        `<script>alert('You entered wrong OTP : ${userenterd_otp} Original OTP is : ${req.session.OTP}');
      window.location.assign('/otppage');
      </script>`,
      );
    }
  } catch (error) {
    res.send("Internal Server Error");
    console.log(error);
  }
});

// *************************************************************************************
// Login using OTP

app.get("/OTPlogin", (req, res) => {
  res.render("OTPlogin.ejs");
});

app.post("/verifyOTP", async (req, res) => {
  try {
    const { email } = req.body;

    const user = await userSchema.findOne({ email });

    if (!user) {
      return res.send("User Not Found!");
    }

    const OTP = Math.floor(100000 + Math.random() * 900000);

    req.session.loginID = user._id;
    req.session.OTP = OTP;
    req.session.OTP_EXPIRE = Date.now() + 2 * 60 * 1000;

    await sendMail(email, OTP);

    res.send(`<script>alert('OTP Sent!');</script>`);
  } catch (error) {
    console.log(error);
    res.send("Internal Server Error");
  }
});

app.post("/verifyAccount", async (req, res) => {
  try {
    const { otp } = req.body;

    if (!req.session.OTP || !req.session.loginID) {
      return res.send("Session expired");
    }

    if (Date.now() > req.session.OTP_EXPIRE) {
      return res.send("OTP expired");
    }

    if (otp != req.session.OTP) {
      return res.send("Invalid OTP");
    }

    delete req.session.OTP;
    delete req.session.OTP_EXPIRE;

    res.send(`<script>
      alert('Login Successful');
      window.location.assign('/dashboard');
    </script>`);
  } catch (error) {
    console.log(error);
    res.send("Internal Server Error");
  }
});

// ********************************************************************************************

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

app.get("/myContent", async (req, res) => {
  try {
    if (!req.session.loginID) {
      return res.send(
        `<script>alert('Session expired!!'); window.location.assign('/')</script>`,
      );
    }
    const posts = await postSchema.find({ userId: req.session.loginID });
    const stories = await storySchema.find({ userId: req.session.loginID });
    const obj = { posts: posts, stories: stories };
    res.render("myContent.ejs", obj);
  } catch (error) {
    res.send("Internal Server Error");
    console.log(error);
  }
});

app.get("/deletePost/:id", async (req, res) => {
  try {
    const id = req.params.id;
    await postSchema.findByIdAndDelete(id);
    res.redirect("/myContent");
  } catch (error) {
    res.send("Internal Server Error");
    console.log(error);
  }
});

app.get("/deleteStory/:id", async (req, res) => {
  try {
    const id = req.params.id;
    await storySchema.findByIdAndDelete(id);
    res.redirect("/myContent");
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
