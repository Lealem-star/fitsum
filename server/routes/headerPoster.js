const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const HeaderPosterImage = require('../models/HeaderPosterImage');
const upload = require('../config/upload');
const auth = require('../middleware/auth');

// Helper function to check DB connection
const isDBConnected = () => {
  return mongoose.connection.readyState === 1;
};

// Get all images
router.get('/images', async (req, res) => {
  if (!isDBConnected()) {
    return res.json([]);
  }
  
  try {
    const images = await HeaderPosterImage.find({ isActive: true })
      .sort({ order: 1 });
    res.json(images);
  } catch (error) {
    console.error('Error fetching images:', error.message);
    res.json([]);
  }
});

// Get all images (including inactive) - for admin (protected)
router.get('/admin/images', auth, async (req, res) => {
  if (!isDBConnected()) {
    return res.status(503).json({ 
      message: 'Database not available. Please check MongoDB connection.',
      images: []
    });
  }
  
  try {
    const images = await HeaderPosterImage.find().sort({ order: 1 });
    res.json(images);
  } catch (error) {
    console.error('Error fetching images:', error.message);
    res.status(500).json({ message: error.message, images: [] });
  }
});

// Get single image by ID (protected)
router.get('/admin/images/:id', auth, async (req, res) => {
  if (!isDBConnected()) {
    return res.status(503).json({ message: 'Database not available. Please check MongoDB connection.' });
  }
  
  try {
    const image = await HeaderPosterImage.findById(req.params.id);
    if (!image) {
      return res.status(404).json({ message: 'Image not found' });
    }
    res.json(image);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Create new image (with file upload support) - protected
router.post('/admin/images', auth, upload.single('image'), async (req, res) => {
  if (!isDBConnected()) {
    return res.status(503).json({ message: 'Database not available. Please check MongoDB connection.' });
  }
  
  try {
    const { altText, order, isActive, imageUrl } = req.body;
    
    // Determine image URL - use uploaded file or provided URL
    let finalImageUrl = imageUrl;
    
    if (req.file) {
      // Use uploaded file
      finalImageUrl = `/uploads/images/${req.file.filename}`;
    } else if (!imageUrl) {
      return res.status(400).json({ message: 'Either upload an image file or provide an image URL' });
    }
    
    const image = new HeaderPosterImage({
      imageUrl: finalImageUrl,
      altText: altText || 'Advertisement image',
      order: parseInt(order) || 0,
      isActive: isActive !== undefined ? isActive : true,
    });

    const savedImage = await image.save();
    res.status(201).json(savedImage);
  } catch (error) {
    console.error('Error creating image:', error.message);
    res.status(400).json({ message: error.message });
  }
});

// Update image (with file upload support) - protected
router.put('/admin/images/:id', auth, upload.single('image'), async (req, res) => {
  if (!isDBConnected()) {
    return res.status(503).json({ message: 'Database not available. Please check MongoDB connection.' });
  }
  
  try {
    const { imageUrl, altText, order, isActive } = req.body;
    const fs = require('fs');
    const path = require('path');
    
    const image = await HeaderPosterImage.findById(req.params.id);
    if (!image) {
      return res.status(404).json({ message: 'Image not found' });
    }

    // If new file is uploaded, delete old file and use new one
    if (req.file) {
      // Delete old file if it was an uploaded file (starts with /uploads)
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
    console.error('Error updating image:', error.message);
    res.status(400).json({ message: error.message });
  }
});

// Delete image - protected
router.delete('/admin/images/:id', auth, async (req, res) => {
  if (!isDBConnected()) {
    return res.status(503).json({ message: 'Database not available. Please check MongoDB connection.' });
  }
  
  try {
    const fs = require('fs');
    const path = require('path');
    
    const image = await HeaderPosterImage.findById(req.params.id);
    if (!image) {
      return res.status(404).json({ message: 'Image not found' });
    }

    // Delete the file if it was an uploaded file
    if (image.imageUrl && image.imageUrl.startsWith('/uploads')) {
      const filePath = path.join(__dirname, '..', image.imageUrl);
      if (fs.existsSync(filePath)) {
        fs.unlinkSync(filePath);
      }
    }

    await HeaderPosterImage.findByIdAndDelete(req.params.id);
    res.json({ message: 'Image deleted successfully' });
  } catch (error) {
    console.error('Error deleting image:', error.message);
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;

