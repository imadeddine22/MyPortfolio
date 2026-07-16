const express = require('express');
const {
  getTestimonials,
  createTestimonial,
  updateTestimonial,
  deleteTestimonial,
} = require('../controllers/testimonialController');
const { protect } = require('../middleware/auth');

const router = express.Router();

router.route('/')
  .get(getTestimonials)
  .post(createTestimonial); // Public can submit reviews, admin approves or manages them.

router.route('/:id')
  .put(protect, updateTestimonial)
  .delete(protect, deleteTestimonial);

module.exports = router;
