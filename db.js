const mongoose = require('mongoose');

const mongoURL = "mongodb://localhost:27017/hotels";
// const mongoURL = "mongodb+srv://velsongaurea:velsong10@cluster0.vb7hnbu.mongodb.net/"

mongoose.connect(mongoURL)
  .then(() => {
    console.log("Connected to mongoDB server");
  })
  .catch((err) => {
    console.error("MongoDB connection error: ", err);
  });

const db = mongoose.connection;

db.on('disconnected', () => {
  console.log("MongoDB Disconnected");
});

module.exports = db;
