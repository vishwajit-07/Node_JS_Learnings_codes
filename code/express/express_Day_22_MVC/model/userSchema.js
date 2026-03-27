const mongoose = require("mongoose");
const userSchema = new mongoose.Schema({
  name: { type: String, require: true },
  email: { type: String, unique: true, require: true },
  username: { type: String, unique: true, require: true },
  phone: { type: String, require: true },
  password: { type: String, require: true },
  profile: { type: String },
  createdAt: { type: Date, default: Date.now() },
});

module.exports = mongoose.model("insta_user", userSchema);
