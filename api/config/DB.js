require('dotenv').config();

const mongoose = require('mongoose');
const { DB_CONN, DB_USER, DB_PW } = process.env;

const connectDB = async () => {
  mongoose
    .connect(DB_CONN, {
      auth: { user: DB_USER, password: DB_PW },
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
    .then(() => console.log('MongoDB Connected...'))
    .catch(console.error);
};

module.exports = connectDB;
