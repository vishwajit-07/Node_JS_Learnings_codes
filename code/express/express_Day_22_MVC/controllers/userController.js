const userSchema = require("../model/userSchema");
const postSchema = require("../model/postSchema");
const storySchema = require("../model/storySchema");

const dashboard = async (req, res) => {
  try {
    const posts = await postSchema.find().populate("userId");
    const stories = await storySchema.find();
    const result = await userSchema.findById(req.session.loginID);
    const obj = { data: result, posts: posts, stories: stories };
    res.render("dashboard.ejs", obj);
  } catch (error) {
    res.send("Internal server error");
    console.log(error);
  }
};

const myContent = async (req, res) => {
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
};

module.exports = {
  dashboard,
  myContent,
};
