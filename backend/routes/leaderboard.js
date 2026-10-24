const express = require('express');
const router = express.Router();
const User = require('../models/User');
const Issue = require('../models/Issue');

// Top users by points
router.get('/users', async (req, res) => {
  const users = await User.find().sort({ points: -1 }).limit(10).select('name points role');
  res.json(users);
});

// Top volunteers (users with role volunteer, by points)
router.get('/volunteers', async (req, res) => {
  const users = await User.find({ role: 'volunteer' }).sort({ points: -1 }).limit(10).select('name points');
  res.json(users);
});

// Departments by number of issues
router.get('/departments', async (req, res) => {
  const agg = await Issue.aggregate([
    { $group: { _id: '$category', count: { $sum: 1 } } },
    { $sort: { count: -1 } }
  ]);
  res.json(agg);
});

module.exports = router;
