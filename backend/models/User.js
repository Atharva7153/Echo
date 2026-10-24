const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: String,
  email: { type: String, unique: true },
  passwordHash: String,
  role: { type: String, enum: ['citizen','admin','volunteer'], default: 'citizen' },
  points: { type: Number, default: 0 },
  badges: { type: [String], default: [] }
}, { timestamps: true });

module.exports = mongoose.model('User', userSchema);
