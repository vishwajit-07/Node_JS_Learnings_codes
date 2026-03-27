const express = require("express");
const router = express.Router();

const {
  login,
  signup,
  signupOTP,
  otpLogin,
  otpPage,
  otpVerify,
  verifyOtp,
  verifyAccount,
  loginPage,
  logout,
} = require("../controllers/authController");

const multer = require("multer");

const storage = multer.diskStorage({
  destination: "public/uploads/",
  filename: (req, file, cb) => {
    cb(null, Date.now() + "_" + file.originalname);
  },
});

const upload = multer({ storage });

router.get("/", loginPage);
router.get("/signup", signup);
router.get("/otppage", otpPage);
router.get("/OTPlogin", otpLogin);
router.get("/logout", logout);
router.post("/login", login);
router.post("/signup", upload.single("profile"), signupOTP);
router.post("/otpverify", otpVerify);
router.post("/verifyOTP", verifyOtp);
router.post("/verifyAccount", verifyAccount);

module.exports = router;
