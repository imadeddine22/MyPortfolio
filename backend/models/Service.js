const mongoose = require('mongoose');

const ServiceSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'Please add a service title'],
    trim: true,
  },
  description: {
    type: String,
    required: [true, 'Please add a service description'],
  },
  icon: {
    type: String, // Can be an uploaded image path or a CSS class
    default: '',
  },
  link: {
    type: String, // Link that takes the visitor to a specific project or details page
    default: '',
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model('Service', ServiceSchema);
