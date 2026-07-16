const mongoose = require('mongoose');

const ProjectSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'Please add a title'],
    trim: true,
  },
  description: {
    type: String,
    required: [true, 'Please add a description'],
  },
  coverImage: {
    type: String,
    required: [true, 'Please add a cover image'],
  },
  gallery: {
    type: [String],
    default: [],
  },
  githubUrl: {
    type: String,
    default: '',
  },
  liveDemo: {
    type: String,
    default: '',
  },
  technologies: {
    type: [String],
    default: [],
  },
  featured: {
    type: Boolean,
    default: false,
  },
}, {
  timestamps: true,
});

module.exports = mongoose.model('Project', ProjectSchema);
