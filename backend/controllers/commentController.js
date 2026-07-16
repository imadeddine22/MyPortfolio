const Comment = require('../models/Comment');

// @desc    Get approved comments for a blog (public)
// @route   GET /api/comments/:blogId
// @access  Public
const getCommentsByBlog = async (req, res, next) => {
  try {
    const comments = await Comment.find({
      blogId: req.params.blogId,
      approved: true,
    }).sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      count: comments.length,
      data: comments,
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Get all comments (both approved and pending) for admin dashboard
// @route   GET /api/comments
// @access  Private/Admin
const getAllCommentsAdmin = async (req, res, next) => {
  try {
    const comments = await Comment.find()
      .populate('blogId', 'title slug')
      .sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      count: comments.length,
      data: comments,
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Create a blog comment (public)
// @route   POST /api/comments
// @access  Public
const createComment = async (req, res, next) => {
  try {
    const comment = await Comment.create(req.body);

    res.status(201).json({
      success: true,
      message: 'Comment submitted successfully and is awaiting moderation',
      data: comment,
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Approve/Disapprove a comment (admin only)
// @route   PUT /api/comments/:id/approve
// @access  Private/Admin
const approveComment = async (req, res, next) => {
  try {
    let comment = await Comment.findById(req.params.id);

    if (!comment) {
      return res.status(404).json({
        success: false,
        message: 'Comment not found',
      });
    }

    const { approved } = req.body;
    
    comment = await Comment.findByIdAndUpdate(req.params.id, { approved }, {
      new: true,
      runValidators: true,
    });

    res.status(200).json({
      success: true,
      message: approved ? 'Comment approved' : 'Comment marked as pending',
      data: comment,
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Delete a comment (admin only)
// @route   DELETE /api/comments/:id
// @access  Private/Admin
const deleteComment = async (req, res, next) => {
  try {
    const comment = await Comment.findById(req.params.id);

    if (!comment) {
      return res.status(404).json({
        success: false,
        message: 'Comment not found',
      });
    }

    await comment.deleteOne();

    res.status(200).json({
      success: true,
      message: 'Comment deleted successfully',
      data: {},
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getCommentsByBlog,
  getAllCommentsAdmin,
  createComment,
  approveComment,
  deleteComment,
};
