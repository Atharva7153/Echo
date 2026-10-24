const mongoose = require('mongoose');

const commentSchema = new mongoose.Schema({
  issue: { type: mongoose.Schema.Types.ObjectId, ref: 'Issue' },
  author: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  text: String
}, { timestamps: true });

module.exports = mongoose.model('Comment', commentSchema);
