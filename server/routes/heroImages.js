const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const HeroImage = require('../models/HeroImage');
const upload = require('../config/upload');
const auth = require('../middleware/auth');

// Helper function to check DB connection
const isDBConnected = () => {
  return mongoose.connection.readyState === 1;
};

// Public: get active hero images for home page
router.get('/images', async (req, res) => {
  if (!isDBConnected()) {
    return res.json([]);
  }

  try {
    const images = await HeroImage.find({ isActive: true }).sort({ order: 1 });
    res.json(images);
  } catch (error) {
    console.error('Error fetching hero images:', error.message);
    res.json([]);
  }
});

// Admin: get all hero images (including inactive)
router.get('/admin/images', auth, async (req, res) => {
  if (!isDBConnected()) {
    return res.status(503).json({
      message: 'Database not available. Please check MongoDB connection.',
      images: [],
    });
  }

  try {
    const images = await HeroImage.find().sort({ order: 1 });
    res.json(images);
  } catch (error) {
    console.error('Error fetching hero images (admin):', error.message);
    res.status(500).json({ message: error.message, images: [] });
  }
});

// Admin: get single hero image
router.get('/admin/images/:id', auth, async (req, res) => {
  if (!isDBConnected()) {
    return res
      .status(503)
      .json({ message: 'Database not available. Please check MongoDB connection.' });
  }

  try {
    const image = await HeroImage.findById(req.params.id);
    if (!image) {
      return res.status(404).json({ message: 'Hero image not found' });
    }
    res.json(image);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Admin: create hero image (file upload or URL)
router.post('/admin/images', auth, upload.single('image'), async (req, res) => {
  if (!isDBConnected()) {
    return res
      .status(503)
      .json({ message: 'Database not available. Please check MongoDB connection.' });
  }

  try {
    const { altText, order, isActive, imageUrl } = req.body;

    let finalImageUrl = imageUrl;

    if (req.file) {
      finalImageUrl = `/uploads/images/${req.file.filename}`;
    } else if (!imageUrl) {
      return res
        .status(400)
        .json({ message: 'Either upload an image file or provide an image URL' });
    }

    const image = new HeroImage({
      imageUrl: finalImageUrl,
      altText: altText || 'Hero image',
      order: parseInt(order) || 0,
      isActive: isActive !== undefined ? isActive : true,
    });

    const savedImage = await image.save();
    res.status(201).json(savedImage);
  } catch (error) {
    console.error('Error creating hero image:', error.message);
    res.status(400).json({ message: error.message });
  }
});

// Admin: update hero image
router.put('/admin/images/:id', auth, upload.single('image'), async (req, res) => {
  if (!isDBConnected()) {
    return res
      .status(503)
      .json({ message: 'Database not available. Please check MongoDB connection.' });
  }

  try {
    const { imageUrl, altText, order, isActive } = req.body;
    const fs = require('fs');
    const path = require('path');

    const image = await HeroImage.findById(req.params.id);
    if (!image) {
      return res.status(404).json({ message: 'Hero image not found' });
    }

    if (req.file) {
      if (image.imageUrl && image.imageUrl.startsWith('/uploads')) {
        const oldFilePath = path.join(__dirname, '..', image.imageUrl);
        if (fs.existsSync(oldFilePath)) {
          fs.unlinkSync(oldFilePath);
        }
      }
      image.imageUrl = `/uploads/images/${req.file.filename}`;
    } else if (imageUrl) {
      image.imageUrl = imageUrl;
    }

    if (altText !== undefined) image.altText = altText;
    if (order !== undefined) image.order = parseInt(order) || 0;
    if (isActive !== undefined) image.isActive = isActive;

    const updatedImage = await image.save();
    res.json(updatedImage);
  } catch (error) {
    console.error('Error updating hero image:', error.message);
    res.status(400).json({ message: error.message });
  }
});

// Admin: delete hero image
router.delete('/admin/images/:id', auth, async (req, res) => {
  if (!isDBConnected()) {
    return res
      .status(503)
      .json({ message: 'Database not available. Please check MongoDB connection.' });
  }

  try {
    const fs = require('fs');
    const path = require('path');

    const image = await HeroImage.findById(req.params.id);
    if (!image) {
      return res.status(404).json({ message: 'Hero image not found' });
    }

    if (image.imageUrl && image.imageUrl.startsWith('/uploads')) {
      const filePath = path.join(__dirname, '..', image.imageUrl);
      if (fs.existsSync(filePath)) {
        fs.unlinkSync(filePath);
      }
    }

    await HeroImage.findByIdAndDelete(req.params.id);
    res.json({ message: 'Hero image deleted successfully' });
  } catch (error) {
    console.error('Error deleting hero image:', error.message);
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;


