const storySchema = require("../model/storySchema");

const deleteStory = async (req, res) => {
  try {
    const id = req.params.id;
    await storySchema.findByIdAndDelete(id);
    res.redirect("/user/myContent");
  } catch (error) {
    res.send("Internal Server Error");
    console.log(error);
  }
};

const addstory = async (req, res) => {
  res.send("addStory.ejs");
};

const addStory = async (req, res) => {
  try {
    const userId = req.session.loginID;
    const { caption } = req.body;
    const story = req.file.filename;
    if (!caption || !story) {
      return res.send(
        `<script>alert('All Fields are mandatory!!'); window.location.assign('/user/dashboard')</script>`,
      );
    }
    const result = new storySchema({ caption, story, userId });
    await result.save();
    return res.send(
      `<script>alert('Story uploaded!!'); window.location.assign('/user/dashboard')</script>`,
    );
  } catch (error) {
    res.send("Internal Server Error");
    console.log(error);
  }
};

module.exports = { deleteStory, addStory, addstory };
