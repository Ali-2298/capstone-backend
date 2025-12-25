const mongoose = require('mongoose');

const itemSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  backlogItemId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Backlog',
    required: true,
  },
  creationDate: {
    type: Date,
    default: Date.now,
  },
}, {
  timestamps: true,
});

const Item = mongoose.model('Item', itemSchema);

module.exports = Item;