const mongoose = require("mongoose");
const connection = async () => {
  try {
    await mongoose.connect(
      "mongodb+srv://vishwajitmavalankar54339_db_user:Vishwajit2001@cluster0.wzlsd79.mongodb.net/linkdin",
    );
    console.log("Database connected!");
    console.log(mongoose.connection.readyState);
  } catch (error) {
    console.log("Database connection failed");
    console.log(mongoose.connection.readyState);
  }
};

connection();
module.exports = connection;
