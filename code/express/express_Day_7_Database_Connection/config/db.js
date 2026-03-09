const mongoose = require("mongoose");
const connection = mongoose
  .connect(
    "mongodb+srv://vishwajitmavalankar54339_db_user:Vishwajit2001@cluster0.wzlsd79.mongodb.net/",
  )
  .then(() => {
    console.log("Database successfully connected!");
  })
  .catch((err) => {
    console.log("Database not connected", err);
  });

module.exports = connection;
