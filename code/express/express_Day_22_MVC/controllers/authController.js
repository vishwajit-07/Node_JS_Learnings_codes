const userSchema = require("../model/userSchema");
const bcrypt = require("bcryptjs");

const sendMail = require("../sendMail");

const loginPage = (req, res) => {
  res.render("login.ejs");
};

const login = async (req, res) => {
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
        `<script>alert('Logged in successfully!'); window.location.assign('/user/dashboard')</script>`,
      );
    }
  } catch (error) {
    res.send("Internal Server Error");
    console.log(error);
  }
};

const signup = (req, res) => {
  res.render("signup.ejs");
};

const signupOTP = async (req, res) => {
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
};

const otpVerify = async (req, res) => {
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
};

const otpLogin = (req, res) => {
  res.render("OTPlogin.ejs");
};

const otpPage = (req, res) => {
  res.render("otppage.ejs");
};

const verifyOtp = async (req, res) => {
  try {
    const { email } = req.body;

    const user = await userSchema.findOne({ email });

    if (!user) {
      return res.send("User Not Found!");
    }

    const OTP = Math.floor(1000 + Math.random() * 9000);

    req.session.loginID = user._id;
    req.session.OTP = OTP;
    req.session.OTP_EXPIRE = Date.now() + 2 * 60 * 1000;

    await sendMail(email, OTP);

    res.send(`<script>alert('OTP Sent!');</script>`);
  } catch (error) {
    console.log(error);
    res.send("Internal Server Error");
  }
};

const verifyAccount = async (req, res) => {
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
};

const logout = (req, res) => {
  req.session.destroy;
  return res.send(
    `<script>alert('Logout Successfully'); window.location.assign('/')</script>`,
  );
};

module.exports = {
  login,
  loginPage,
  signup,
  signupOTP,
  otpVerify,
  otpLogin,
  otpPage,
  verifyOtp,
  verifyAccount,
  logout,
};
