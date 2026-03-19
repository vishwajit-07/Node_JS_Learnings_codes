const mongoose = require("mongoose");
const postSchema = new mongoose.Schema({
  title: { type: String, require: true },
  caption: { type: String, require: true },
  post: { type: String, require: true },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "insta_user",
  },
  createdAt: { type: Date, default: Date.now() },
});
module.exports = mongoose.model("post", postSchema);
