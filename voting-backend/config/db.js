const mongoose = require('mongoose');

const connectDB = async () => {
  await mongoose.connect('mongodb+srv://GajamRaghu:Gajam%402003@cluster0.sm6xijx.mongodb.net/voting_app');
  console.log('MongoDB connected');
};

module.exports = connectDB;
