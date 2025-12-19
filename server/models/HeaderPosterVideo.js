const mongoose = require('mongoose');

const headerPosterVideoSchema = new mongoose.Schema({
  videoUrl: {
    type: String,
    required: true,
  },
  position: {
    type: String,
    enum: ['left', 'right'],
    required: true,
  },
  altText: {
    type: String,
    default: 'Advertisement video',
  },
  isActive: {
    type: Boolean,
    default: true,
  },
}, {
  timestamps: true,
});

module.exports = mongoose.model('HeaderPosterVideo', headerPosterVideoSchema);

