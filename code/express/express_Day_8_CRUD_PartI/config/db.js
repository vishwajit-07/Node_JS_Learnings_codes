const mongoose = require("mongoose");
const connection = async () => {
  try {
    await mongoose.connect(
      "mongodb+srv://vishwajitmavalankar54339_db_user:Vishwajit2001@cluster0.wzlsd79.mongodb.net/SampleDB",
    );
    console.log("Database connected successfully!");
  } catch (error) {
    console.log("Database connection failed!", error);
  }
};
connection();

module.exports = connection;
