const mongoose = require('mongoose');

const BlogSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'Please add a title'],
    trim: true,
  },
  slug: {
    type: String,
    unique: true,
  },
  excerpt: {
    type: String,
    required: [true, 'Please add an excerpt'],
    trim: true,
  },
  content: {
    type: String,
    required: [true, 'Please add content'],
  },
  coverImage: {
    type: String,
    default: '/assets/img/blog/blog-1.jpg',
  },
  author: {
    type: String,
    default: 'Imad',
  },
  category: {
    type: String,
    required: [true, 'Please add a category'],
    trim: true,
  },
  tags: {
    type: [String],
    default: [],
  },
  published: {
    type: Boolean,
    default: true,
  },
}, {
  timestamps: true,
});

// Auto-generate slug from title before saving
BlogSchema.pre('save', function (next) {
  if (!this.isModified('title')) {
    return next();
  }
  this.slug = this.title
    .toLowerCase()
    .replace(/[^\w\s-]/g, '') // remove non-alphanumeric chars
    .replace(/\s+/g, '-')     // replace spaces with hyphens
    .replace(/-+/g, '-');     // remove duplicate hyphens
  next();
});

module.exports = mongoose.model('Blog', BlogSchema);
