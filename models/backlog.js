const mongoose = require('mongoose');

const backlogSchema = mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  type: {
    type: String,
    enum: ['Movie', 'Series', 'Game'],
    required: true,
  },
  status: {
    type: String,
    enum: ['backlog', 'in progress', 'completed', 'dropped'],
    default: 'backlog',
  },
  platform: {
    type: String,
  },
  notes: {
    type: String,
  },
  priority: {
    type: Number,
  },
}, {
  timestamps: true,
});

const Backlog = mongoose.model('Backlog', backlogSchema);

module.exports = Backlog;