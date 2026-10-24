const path = require('path');
require('dotenv').config({ path: path.resolve(__dirname, '.env') });
require('dotenv').config();
const mongoose = require('mongoose');
const Issue = require('./models/Issue');
const User = require('./models/User');

const mongoUri = process.env.MONGODB_URI || "mongodb://localhost:27017/echo";
mongoose.connect(mongoUri, { useNewUrlParser: true, useUnifiedTopology: true });

(async () => {
  const users = await User.find();
  if (!users.length) {
    console.log('No users found.');
    return mongoose.disconnect();
  }
  const issues = await Issue.find({ createdBy: { $exists: false } });
  for (const issue of issues) {
    const randomUser = users[Math.floor(Math.random() * users.length)];
    issue.createdBy = randomUser._id;
    await issue.save();
  }
  console.log('Fixed issues with missing createdBy.');
  mongoose.disconnect();
})();
