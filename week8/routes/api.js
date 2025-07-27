const express = require('express');
const multer = require('multer');
const axios = require('axios');
const router = express.Router();

// Multer Setup
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/');
  },
  filename: function (req, file, cb) {
    const ext = file.originalname.split('.').pop();
    cb(null, `${Date.now()}.${ext}`);
  },
});
const upload = multer({ storage });

// File Upload Route
router.post('/upload', upload.single('myFile'), (req, res) => {
  if (!req.file) {
    return res.status(400).json({ success: false, message: 'No file uploaded' });
  }
  res.status(200).json({
    success: true,
    message: 'File uploaded successfully',
    filePath: `/uploads/${req.file.filename}`,
  });
});

// 3rd Party API Integration
router.get('/random-user', async (req, res, next) => {
  try {
    const response = await axios.get('https://randomuser.me/api/');
    res.status(200).json({
      success: true,
      user: response.data.results[0],
    });
  } catch (err) {
    next(err); // forward to error handler
  }
});

module.exports = router;
