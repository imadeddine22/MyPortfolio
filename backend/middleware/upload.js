const multer = require('multer');

// Use Memory Storage so file buffer is held in memory for Base64 encoding
const storage = multer.memoryStorage();

// Check File Type
function checkFileType(file, cb) {
  const filetypes = /jpeg|jpg|png|gif|svg|webp/;
  const extname = filetypes.test(file.originalname.toLowerCase());
  const mimetype = filetypes.test(file.mimetype);

  if (mimetype || extname) {
    return cb(null, true);
  } else {
    cb(new Error('Images and SVGs only!'));
  }
}

// Init Upload
const upload = multer({
  storage: storage,
  limits: { fileSize: 10 * 1024 * 1024 }, // limit 10MB
  fileFilter: function (req, file, cb) {
    checkFileType(file, cb);
  }
});

module.exports = upload;
