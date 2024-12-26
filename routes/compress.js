const express = require('express');
const multer = require('multer');
const { compressVideo } = require('../services/videoCompression');

const router = express.Router();

// Multer for file uploads
const upload = multer({ storage: multer.memoryStorage() });

// Route for video compression
router.post('/', upload.single('video'), async (req, res) => {
  try {
    const { resolution, crf, format } = req.body;

    // Check for uploaded file
    if (!req.file) {
      return res.status(400).json({ error: 'No video file uploaded' });
    }

    // Compress video
    const compressedVideoBuffer = await compressVideo(
      req.file.buffer,
      resolution,
      crf,
      format
    );

    // Set response headers
    res.setHeader('Content-Disposition', attachment; filename="compressed.${format}");
    res.setHeader('Content-Type', video/${format});

    // Send the compressed video
    return res.send(compressedVideoBuffer);
  } catch (error) {
    console.error('Compression Error:', error);
    res.status(500).json({ error: 'Failed to compress the video' });
  }
});

module.exports = router;
