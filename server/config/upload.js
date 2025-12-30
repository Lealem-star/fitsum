const multer = require('multer');
const path = require('path');
const fs = require('fs');

// Ensure upload directories exist
const uploadDir = path.join(__dirname, '..', '..', 'uploads');
const videoDir = path.join(uploadDir, 'videos');
const imageDir = path.join(uploadDir, 'images');

fs.existsSync(uploadDir) || fs.mkdirSync(uploadDir);
fs.existsSync(videoDir) || fs.mkdirSync(videoDir);
fs.existsSync(imageDir) || fs.mkdirSync(imageDir);

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    if (file.fieldname === 'video') {
      cb(null, videoDir);
    } else if (file.fieldname === 'image') {
      cb(null, imageDir);
    } else {
      cb(new Error('Invalid fieldname'), uploadDir); // Default to a generic folder or handle error
    }
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    const ext = path.extname(file.originalname);
    const name = path.basename(file.originalname, ext).replace(/\s+/g, '-');
    cb(null, name + '-' + uniqueSuffix + ext);
  }
});

// File filter - images or videos based on field name
const fileFilter = (req, file, cb) => {
  const isVideo = file.fieldname === 'video';
  const isImage = file.fieldname === 'image';
  
  if (isVideo) {
    const allowedTypes = /mp4|webm|ogg/;
    const extname = allowedTypes.test(path.extname(file.originalname).toLowerCase());
    const mimetype = /video/.test(file.mimetype);
    
    if (mimetype && extname) {
      return cb(null, true);
    } else {
      cb(new Error('Only video files are allowed (mp4, webm, ogg)'));
    }
  } else if (isImage) {
    const allowedTypes = /jpeg|jpg|png|gif|webp/;
    const extname = allowedTypes.test(path.extname(file.originalname).toLowerCase());
    const mimetype = allowedTypes.test(file.mimetype);

    if (mimetype && extname) {
      return cb(null, true);
    } else {
      cb(new Error('Only image files are allowed (jpeg, jpg, png, gif, webp)'));
    }
  } else {
    cb(new Error('Invalid file type'));
  }
};

// Configure multer
const upload = multer({
  storage: storage,
  limits: {
    fileSize: 50 * 1024 * 1024 // 50MB limit (applies to both images and videos)
  },
  fileFilter: fileFilter
});

module.exports = upload;
