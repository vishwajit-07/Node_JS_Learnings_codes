const mongoose = require("mongoose");
const userSchema = new mongoose.Schema({
  userName: { type: String, unique: true, require: true },
  userEmail: { type: String, unique: true, require: true },
  password: { type: String, require: true },
  profile: { type: String },
  userPhone: { type: String, require: true },
});

module.exports = mongoose.model("user_info", userSchema);
