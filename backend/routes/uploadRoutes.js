const express = require('express');
const upload = require('../middleware/upload');
const { protect } = require('../middleware/auth');

const router = express.Router();

// @desc    Upload an image
// @route   POST /api/upload
// @access  Private/Admin
router.post('/', protect, upload.single('image'), (req, res) => {
  if (!req.file) {
    return res.status(400).json({
      success: false,
      message: 'Please upload an image file',
    });
  }

  // Convert image buffer into Base64 Data URI for permanent storage in MongoDB
  const mime = req.file.mimetype || 'image/jpeg';
  const base64Str = req.file.buffer.toString('base64');
  const filePath = `data:${mime};base64,${base64Str}`;

  res.status(200).json({
    success: true,
    message: 'Image uploaded successfully',
    data: {
      filePath,
    }
  });
});

module.exports = router;
