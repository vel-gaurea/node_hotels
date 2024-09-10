const mongoose = require('mongoose');
require('dotenv').config(); 


// const mongoURL = process.env.MONGODB_URL_lOCAL;
const mongoURL = process.env.MONGODB_URL

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
