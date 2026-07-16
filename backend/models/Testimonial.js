const mongoose = require('mongoose');

const TestimonialSchema = new mongoose.Schema({
  clientName: {
    type: String,
    required: [true, 'Please add a client name'],
    trim: true,
  },
  company: {
    type: String,
    default: 'Independent',
    trim: true,
  },
  position: {
    type: String,
    default: 'Client',
    trim: true,
  },
  avatar: {
    type: String,
    default: '/assets/img/users/avata-1.png',
  },
  email: {
    type: String,
    trim: true,
  },
  rating: {
    type: Number,
    required: [true, 'Please add a rating between 1 and 5'],
    min: 1,
    max: 5,
  },
  comment: {
    type: String,
    required: [true, 'Please add a comment'],
  },
  approved: {
    type: Boolean,
    default: false,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model('Testimonial', TestimonialSchema);
