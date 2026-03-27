const postSchema = require("../model/postSchema");

const deletePost = async (req, res) => {
  try {
    const id = req.params.id;
    await postSchema.findByIdAndDelete(id);
    res.redirect("/myContent");
  } catch (error) {
    res.send("Internal Server Error");
    console.log(error);
  }
};

const addPost = async (req, res) => {
  try {
    const userId = req.session.loginID;
    const post = req.file.filename;
    const { title, caption } = req.body;
    if ((!title, !caption)) {
      return res.send(
        `<script>alert('All Fields are mandatory!!'); window.location.assign('/user/dashboard')</script>`,
      );
    }
    const result = new postSchema({ title, caption, post, userId });
    await result.save();
    return res.send(
      `<script>alert('Post uploaded!'); window.location.assign('/user/dashboard')</script>`,
    );
  } catch (error) {
    res.send("Internal Server Error");
    console.log(error);
  }
};
module.exports = { addPost, deletePost };
