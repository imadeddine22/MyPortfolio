const express = require('express');
const {
  getCommentsByBlog,
  getAllCommentsAdmin,
  createComment,
  approveComment,
  deleteComment,
} = require('../controllers/commentController');
const { protect } = require('../middleware/auth');

const router = express.Router();

router.route('/')
  .get(protect, getAllCommentsAdmin)
  .post(createComment);

router.route('/:blogId')
  .get(getCommentsByBlog);

router.route('/:id/approve')
  .put(protect, approveComment);

router.route('/:id')
  .delete(protect, deleteComment);

module.exports = router;
