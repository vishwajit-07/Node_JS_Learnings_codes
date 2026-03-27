const express = require("express");
const router = express.Router();

const { dashboard, myContent } = require("../controllers/userController");
const { addPost, deletePost } = require("../controllers/postController");
const {
  addStory,
  deleteStory,
  addstory,
} = require("../controllers/storyController");

const auth = require("../middleware/authMiddleware");

const multer = require("multer");

const storage = multer.diskStorage({
  destination: "public/uploads/",
  filename: (req, file, cb) => {
    cb(null, Date.now() + "_" + file.originalname);
  },
});

const upload = multer({ storage });

router.get("/dashboard", auth, dashboard);

router.get("/addStory", auth, addstory);
router.post("/addStory", upload.single("story"), addStory);
router.get("/deleteStory/:id", deleteStory);

router.post("/addPost", upload.single("post"), addPost);
router.get("/deletePost/:id", deletePost);

router.get("/myContent", myContent);

module.exports = router;
