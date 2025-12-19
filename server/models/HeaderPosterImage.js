const mongoose = require('mongoose');

const headerPosterImageSchema = new mongoose.Schema({
  imageUrl: {
    type: String,
    required: true,
  },
  altText: {
    type: String,
    default: 'Advertisement image',
  },
  order: {
    type: Number,
    default: 0,
  },
  isActive: {
    type: Boolean,
    default: true,
  },
}, {
  timestamps: true,
});

module.exports = mongoose.model('HeaderPosterImage', headerPosterImageSchema);

