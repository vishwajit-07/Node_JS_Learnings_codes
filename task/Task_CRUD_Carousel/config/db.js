const mongoose = require("mongoose");
const connection = async () => {
  try {
    await mongoose.connect(
      "mongodb+srv://vishwajitmavalankar54339_db_user:Vishwajit2001@cluster0.wzlsd79.mongodb.net/CourselDB",
    );
    console.log("Database connected successfully!");
    console.log(mongoose.connection.readyState);
  } catch (error) {
    console.log("Database connection failed", error);
    console.log(mongoose.connection.readyState);
  }
};
connection();

module.exports = connection;
