const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const LatestPost = require('../models/LatestPost');
const multer = require('multer');
const path = require('path');
const fs = require('fs');

// Create uploads directory for latest posts if it doesn't exist
const latestPostsDir = path.join(__dirname, '../uploads/latest-posts');
if (!fs.existsSync(latestPostsDir)) {
  fs.mkdirSync(latestPostsDir, { recursive: true });
}

// Configure storage for latest posts
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, latestPostsDir);
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    const ext = path.extname(file.originalname);
    const name = path.basename(file.originalname, ext).replace(/\s+/g, '-');
    cb(null, name + '-' + uniqueSuffix + ext);
  }
});

const upload = multer({
  storage: storage,
  limits: {
    fileSize: 50 * 1024 * 1024 // 50MB limit
  },
  fileFilter: function (req, file, cb) {
    const allowedTypes = /jpeg|jpg|png|gif|webp|mp4|webm|ogg/;
    const extname = allowedTypes.test(path.extname(file.originalname).toLowerCase());
    const mimetype = allowedTypes.test(file.mimetype) || /video/.test(file.mimetype) || /image/.test(file.mimetype);
    
    if (mimetype && extname) {
      return cb(null, true);
    } else {
      cb(new Error('Only image and video files are allowed'));
    }
  }
});

// Get all active posts, newest first (public)
router.get('/', async (req, res) => {
  try {
    const posts = await LatestPost.find({ isActive: true }).sort({ createdAt: -1 });
    res.json(posts);
  } catch (err) {
    console.error('Error fetching latest posts:', err);
    res.status(500).json({ message: 'Server error fetching latest posts' });
  }
});

// Get all posts including inactive (admin only)
router.get('/admin', auth, async (req, res) => {
  try {
    const posts = await LatestPost.find().sort({ createdAt: -1 });
    res.json(posts);
  } catch (err) {
    console.error('Error fetching all posts:', err);
    res.status(500).json({ message: 'Server error fetching posts' });
  }
});

// Create a post (protected) - supports file upload
router.post('/', auth, upload.single('file'), async (req, res) => {
  try {
    const { title, body, type, mediaUrl, isActive } = req.body;
    if (!type) {
      return res.status(400).json({ message: 'type is required' });
    }

    let finalMediaUrl = mediaUrl;
    
    // If file was uploaded, use the uploaded file path
    if (req.file) {
      finalMediaUrl = `/uploads/latest-posts/${req.file.filename}`;
    }

    const post = await LatestPost.create({ 
      title, 
      body, 
      type, 
      mediaUrl: finalMediaUrl, 
      isActive: isActive !== undefined ? isActive : true 
    });
    res.status(201).json(post);
  } catch (err) {
    console.error('Error creating latest post:', err);
    res.status(500).json({ message: 'Server error creating post' });
  }
});

// Update a post (protected) - supports file upload
router.put('/:id', auth, upload.single('file'), async (req, res) => {
  try {
    const { title, body, type, mediaUrl, isActive } = req.body;
    const post = await LatestPost.findById(req.params.id);
    
    if (!post) {
      return res.status(404).json({ message: 'Post not found' });
    }

    // If new file is uploaded, delete old file and use new one
    if (req.file) {
      // Delete old file if it was an uploaded file
      if (post.mediaUrl && post.mediaUrl.startsWith('/uploads/latest-posts')) {
        const oldFilePath = path.join(__dirname, '..', post.mediaUrl);
        if (fs.existsSync(oldFilePath)) {
          fs.unlinkSync(oldFilePath);
        }
      }
      post.mediaUrl = `/uploads/latest-posts/${req.file.filename}`;
    } else if (mediaUrl !== undefined) {
      post.mediaUrl = mediaUrl;
    }

    if (title !== undefined) post.title = title;
    if (body !== undefined) post.body = body;
    if (type !== undefined) post.type = type;
    if (isActive !== undefined) post.isActive = isActive;

    const updated = await post.save();
    res.json(updated);
  } catch (err) {
    console.error('Error updating latest post:', err);
    res.status(500).json({ message: 'Server error updating post' });
  }
});

// Delete a post (protected)
router.delete('/:id', auth, async (req, res) => {
  try {
    const post = await LatestPost.findById(req.params.id);
    if (!post) {
      return res.status(404).json({ message: 'Post not found' });
    }

    // Delete the file if it was an uploaded file
    if (post.mediaUrl && post.mediaUrl.startsWith('/uploads/latest-posts')) {
      const filePath = path.join(__dirname, '..', post.mediaUrl);
      if (fs.existsSync(filePath)) {
        fs.unlinkSync(filePath);
      }
    }

    await LatestPost.findByIdAndDelete(req.params.id);
    res.json({ message: 'Post deleted' });
  } catch (err) {
    console.error('Error deleting latest post:', err);
    res.status(500).json({ message: 'Server error deleting post' });
  }
});

module.exports = router;

