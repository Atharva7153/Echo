const express = require('express');
const router = express.Router();
const Issue = require('../models/Issue');
const Comment = require('../models/Comment');
const User = require('../models/User');

// list with filters
router.get('/', async (req, res) => {
  const { status, category } = req.query;
  const q = {};
  if (status) q.status = status;
  if (category) q.category = category;
  const issues = await Issue.find(q)
    .sort({ createdAt: -1 })
    .populate('createdBy', 'name role')
    .select('+createdAt +updatedAt');
  res.json(issues);
});

// create issue
router.post('/', async (req, res) => {
  try {
    const { title, description, media, locationText, category, urgency } = req.body;
    // Pick a random user as the reporter (for demo)
    const users = await User.find();
    const randomUser = users[Math.floor(Math.random() * users.length)];
    const issue = new Issue({
      title,
      description,
      media,
      locationText,
      category,
      urgency,
      upvotes: [],
      createdBy: randomUser ? randomUser._id : undefined
    });
    await issue.save();
    res.json(issue);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// get single issue + comments
router.get('/:id', async (req, res) => {
  const issue = await Issue.findById(req.params.id);
  if (!issue) return res.status(404).json({ error: 'Not found' });
  const comments = await Comment.find({ issue: issue._id });
  res.json({ issue, comments });
});

// upvote (just increment/decrement a counter, no user tracking)
router.put('/:id/upvote', async (req, res) => {
  const issue = await Issue.findById(req.params.id);
  if (!issue) return res.status(404).json({ error: 'Not found' });

  issue.upvotesCount = (issue.upvotesCount || 0) + 1;
  await issue.save();

  res.json({ upvotesCount: issue.upvotesCount });
});

// add comment (anonymous)
router.post('/:id/comments', async (req, res) => {
  const { text } = req.body;
  const issue = await Issue.findById(req.params.id);
  if (!issue) return res.status(404).json({ error: 'Not found' });

  const comment = new Comment({ issue: issue._id, text });
  await comment.save();

  res.json({ comment });
});

// Mark issue as resolved
router.put('/:id/resolve', async (req, res) => {
  const issue = await Issue.findById(req.params.id);
  if (!issue) return res.status(404).json({ error: 'Not found' });
  issue.status = 'Resolved';
  await issue.save();
  res.json({ success: true });
});

module.exports = router;
