const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const HeaderPosterVideo = require('../models/HeaderPosterVideo');
const upload = require('../config/upload');
const auth = require('../middleware/auth');
const fs = require('fs');
const path = require('path');

// Helper function to check DB connection
const isDBConnected = () => {
  return mongoose.connection.readyState === 1;
};

// Get all videos
router.get('/videos', async (req, res) => {
  if (!isDBConnected()) {
    return res.json([]);
  }
  
  try {
    const videos = await HeaderPosterVideo.find({ isActive: true });
    
    // Verify files exist for uploaded videos
    const verifiedVideos = videos.map(video => {
      if (video.videoUrl && video.videoUrl.startsWith('/uploads')) {
        const filePath = path.join(__dirname, '..', video.videoUrl);
        if (!fs.existsSync(filePath)) {
          console.warn(`Video file not found: ${video.videoUrl} (ID: ${video._id})`);
          // File doesn't exist - could mark as inactive, but for now just log
        }
      }
      return video;
    });
    
    res.json(verifiedVideos);
  } catch (error) {
    console.error('Error fetching videos:', error.message);
    res.json([]);
  }
});

// Get all videos (including inactive) - for admin (protected)
router.get('/admin/videos', auth, async (req, res) => {
  if (!isDBConnected()) {
    return res.status(503).json({ 
      message: 'Database not available. Please check MongoDB connection.',
      videos: []
    });
  }
  
  try {
    const videos = await HeaderPosterVideo.find().sort({ position: 1 });
    res.json(videos);
  } catch (error) {
    console.error('Error fetching videos:', error.message);
    res.status(500).json({ message: error.message, videos: [] });
  }
});

// Get single video by ID (protected)
router.get('/admin/videos/:id', auth, async (req, res) => {
  if (!isDBConnected()) {
    return res.status(503).json({ message: 'Database not available. Please check MongoDB connection.' });
  }
  
  try {
    const video = await HeaderPosterVideo.findById(req.params.id);
    if (!video) {
      return res.status(404).json({ message: 'Video not found' });
    }
    res.json(video);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Create new video (with file upload support) - protected
router.post('/admin/videos', auth, upload.single('video'), async (req, res) => {
  if (!isDBConnected()) {
    return res.status(503).json({ message: 'Database not available. Please check MongoDB connection.' });
  }
  
  try {
    const { position, altText, isActive, videoUrl } = req.body;
    
    if (!position || !['left', 'right'].includes(position)) {
      return res.status(400).json({ message: 'Position must be "left" or "right"' });
    }
    
    // Determine video URL - use uploaded file or provided URL
    let finalVideoUrl = videoUrl;
    
    if (req.file) {
      // Use uploaded file - verify it exists
      const filePath = path.join(__dirname, '..', 'uploads', 'videos', req.file.filename);
      if (!fs.existsSync(filePath)) {
        console.error('Uploaded file not found at:', filePath);
        return res.status(500).json({ message: 'File upload failed - file not found on server' });
      }
      finalVideoUrl = `/uploads/videos/${req.file.filename}`;
      console.log('Video file saved successfully:', finalVideoUrl);
    } else if (!videoUrl) {
      return res.status(400).json({ message: 'Either upload a video file or provide a video URL' });
    }
    
    // Check if video already exists for this position
    const existingVideo = await HeaderPosterVideo.findOne({ position, isActive: true });
    if (existingVideo) {
      // Deactivate the old video
      existingVideo.isActive = false;
      await existingVideo.save();
    }
    
    const video = new HeaderPosterVideo({
      videoUrl: finalVideoUrl,
      position,
      altText: altText || 'Advertisement video',
      isActive: isActive !== undefined ? isActive : true,
    });

    const savedVideo = await video.save();
    res.status(201).json(savedVideo);
  } catch (error) {
    console.error('Error creating video:', error.message);
    res.status(400).json({ message: error.message });
  }
});

// Update video (with file upload support) - protected
router.put('/admin/videos/:id', auth, upload.single('video'), async (req, res) => {
  if (!isDBConnected()) {
    return res.status(503).json({ message: 'Database not available. Please check MongoDB connection.' });
  }
  
  try {
    const { videoUrl, altText, isActive, position } = req.body;
    const fs = require('fs');
    const path = require('path');
    
    const video = await HeaderPosterVideo.findById(req.params.id);
    if (!video) {
      return res.status(404).json({ message: 'Video not found' });
    }

    // If new file is uploaded, delete old file and use new one
    if (req.file) {
      // Delete old file if it was an uploaded file (starts with /uploads)
      if (video.videoUrl && video.videoUrl.startsWith('/uploads')) {
        const oldFilePath = path.join(__dirname, '..', video.videoUrl);
        if (fs.existsSync(oldFilePath)) {
          fs.unlinkSync(oldFilePath);
        }
      }
      video.videoUrl = `/uploads/videos/${req.file.filename}`;
    } else if (videoUrl) {
      video.videoUrl = videoUrl;
    }
    
    if (position && ['left', 'right'].includes(position)) {
      video.position = position;
    }
    if (altText !== undefined) video.altText = altText;
    if (isActive !== undefined) video.isActive = isActive;

    const updatedVideo = await video.save();
    res.json(updatedVideo);
  } catch (error) {
    console.error('Error updating video:', error.message);
    res.status(400).json({ message: error.message });
  }
});

// Delete video - protected
router.delete('/admin/videos/:id', auth, async (req, res) => {
  if (!isDBConnected()) {
    return res.status(503).json({ message: 'Database not available. Please check MongoDB connection.' });
  }
  
  try {
    const fs = require('fs');
    const path = require('path');
    
    const video = await HeaderPosterVideo.findById(req.params.id);
    if (!video) {
      return res.status(404).json({ message: 'Video not found' });
    }

    // Delete the file if it was an uploaded file
    if (video.videoUrl && video.videoUrl.startsWith('/uploads')) {
      const filePath = path.join(__dirname, '..', video.videoUrl);
      if (fs.existsSync(filePath)) {
        fs.unlinkSync(filePath);
      }
    }

    await HeaderPosterVideo.findByIdAndDelete(req.params.id);
    res.json({ message: 'Video deleted successfully' });
  } catch (error) {
    console.error('Error deleting video:', error.message);
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;

