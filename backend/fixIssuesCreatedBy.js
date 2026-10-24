const mongoose = require('mongoose');
const Issue = require('./models/Issue');
const User = require('./models/User');

mongoose.connect("mongodb+srv://AtharvaS7153:ddskdhf123@atharvadb.olmumix.mongodb.net/", { useNewUrlParser: true, useUnifiedTopology: true });

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
