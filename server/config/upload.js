const multer = require('multer');
const path = require('path');
const cloudinary = require('cloudinary').v2;
const { CloudinaryStorage } = require('multer-storage-cloudinary');

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET
});

const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: (req, file) => {
      if (file.fieldname === 'video') {
        return 'uploads/videos';
      } else if (file.fieldname === 'image') {
        return 'uploads/images';
      }
      return 'uploads/others'; // Default folder
    },
    public_id: (req, file) => {
      const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
      const ext = path.extname(file.originalname);
      const name = path.basename(file.originalname, ext).replace(/\s+/g, '-');
      return name + '-' + uniqueSuffix;
    },
    resource_type: (req, file) => {
      if (file.fieldname === 'video') {
        return 'video';
      }
      return 'image';
    },
  },
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

