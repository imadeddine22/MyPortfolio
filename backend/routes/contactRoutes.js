const express = require('express');
const {
  getContacts,
  createContact,
  updateContact,
  deleteContact,
} = require('../controllers/contactController');
const { protect } = require('../middleware/auth');

const router = express.Router();

router.route('/')
  .get(protect, getContacts)
  .post(createContact);

router.route('/:id')
  .put(protect, updateContact)
  .delete(protect, deleteContact);

module.exports = router;
