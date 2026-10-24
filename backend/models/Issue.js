const mongoose = require('mongoose');

const issueSchema = new mongoose.Schema({
  title: String,
  description: String,
  imageURL: String,
  locationText: String,
  status: { type: String, enum: ['Pending','In Progress','Resolved'], default: 'Pending' },
  category: String,
  urgency: { type: String, enum: ['Low','Medium','High'], default: 'Low' },
  upvotes: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
  createdBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  proofImages: [String],
  media: [String]
}, { timestamps: true });

module.exports = mongoose.model('Issue', issueSchema);
