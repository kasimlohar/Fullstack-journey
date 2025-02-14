/**
 * Cloudinary Configuration Module
 * Configures Cloudinary storage for file uploads
 */

const cloudinary = require('cloudinary').v2;
const { CloudinaryStorage } = require('multer-storage-cloudinary');

// Validate environment variables
if (!process.env.CLOUD_NAME || !process.env.CLOUD_API_KEY || !process.env.CLOUD_API_SECRET) {
    console.error('❌ Missing Cloudinary credentials');
    process.exit(1);
}

// Configure Cloudinary
cloudinary.config({
    cloud_name: process.env.CLOUD_NAME,
    api_key: process.env.CLOUD_API_KEY,
    api_secret: process.env.CLOUD_API_SECRET,
    secure: true
});

// Configure storage
const storage = new CloudinaryStorage({
    cloudinary,
    params: {
        folder: 'WildSpire',
        allowedFormats: ['jpeg', 'jpg', 'png', 'webp'],
        transformation: [
            { width: 1200, height: 800, crop: 'limit' },
            { quality: 'auto', fetch_format: 'auto' }
        ]
    }
});

module.exports = {
    cloudinary,
    storage
};