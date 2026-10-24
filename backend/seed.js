require('dotenv').config();
const mongoose = require("mongoose");
const User = require("./models/User");

mongoose.connect(process.env.MONGODB_URI || "mongodb://localhost:27017/echo-v2", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const users = [
  {
    name: "Rahul Mehta",
    email: "rahul@example.com",
    passwordHash: "x",
    role: "citizen",
    points: 40,
  },
  {
    name: "Rajesh Kumar",
    email: "rajesh@example.com",
    passwordHash: "x",
    role: "volunteer",
    points: 70,
  },
  {
    name: "Priya Nair",
    email: "priya@example.com",
    passwordHash: "x",
    role: "citizen",
    points: 25,
  },
  {
    name: "Ananya Verma",
    email: "ananya@example.com",
    passwordHash: "x",
    role: "admin",
    points: 100,
  },
  {
    name: "Vikram Singh",
    email: "vikram@example.com",
    passwordHash: "x",
    role: "volunteer",
    points: 55,
  },
];

(async () => {
  await User.deleteMany({});
  await User.insertMany(users);
  console.log("Dummy users seeded");
  mongoose.disconnect();
})();
