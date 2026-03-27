const mongoose = require("mongoose");
const storySchema = new mongoose.Schema({
  caption: { type: String, require: true },
  story: { type: String, require: true },
  userId: { type: String, require: true },
  createdAt: { type: Date, default: Date.now() },
});
module.exports = mongoose.model("story", storySchema);
