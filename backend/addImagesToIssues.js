const mongoose = require('mongoose');
const Issue = require('./models/Issue');

mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true });

const images = [
  // Add your Cloudinary image URLs here, one array per issue (order matches issues in DB)
  ['https://res.cloudinary.com/your_cloud/image/upload/v1/sample1.jpg'],
  ['https://res.cloudinary.com/your_cloud/image/upload/v1/sample2.jpg'],
  // ...add more arrays for each issue you want to update
];

(async () => {
  const issues = await Issue.find().sort({ createdAt: 1 }); // or any order you want
  for (let i = 0; i < images.length && i < issues.length; i++) {
    issues[i].media = images[i];
    await issues[i].save();
    console.log(`Updated issue ${issues[i]._id} with images`);
  }
  mongoose.disconnect();
})();
