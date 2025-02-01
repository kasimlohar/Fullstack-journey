/**
 * Cloudinary Configuration Module
 * Configures Cloudinary storage for file uploads
 */

const cloudinary = require('cloudinary').v2;
const { CloudinaryStorage } = require('multer-storage-cloudinary');

// Validate environment variables
const validateCloudConfig = () => {
  const requiredVars = ['CLOUD_NAME', 'CLOUD_API_KEY', 'CLOUD_API_SECRET'];
  const missingVars = requiredVars.filter(varName => !process.env[varName]);

  if (missingVars.length > 0) {
    throw new Error(`Missing Cloudinary configuration: ${missingVars.join(', ')}`);
  }
};

try {
  // Verify configuration before initializing
  validateCloudConfig();

  // Configure Cloudinary SDK
  cloudinary.config({
    cloud_name: process.env.CLOUD_NAME,
    api_key: process.env.CLOUD_API_KEY,
    api_secret: process.env.CLOUD_API_SECRET,
    secure: true // Enforce HTTPS
  });

  // Configure Multer storage engine for Cloudinary
  const cloudinaryStorage = new CloudinaryStorage({
    cloudinary: cloudinary,
    params: {
      folder: `wanderlust_${process.env.NODE_ENV || 'development'}`, // Environment-specific folder
      allowed_formats: ['png', 'jpeg', 'jpg', 'webp'], // Added modern webp format
      transformation: [{ quality: 'auto', fetch_format: 'auto' }], // Optimize delivery
      resource_type: 'auto', // Handle both images and videos
      max_file_size: 5 * 1024 * 1024 // 5MB file size limit
    }
  });

  module.exports = {
    cloudinary,
    storage: cloudinaryStorage
  };

} catch (error) {
  console.error('❌ Cloudinary configuration failed:', error.message);
  process.exit(1); // Fail fast if configuration is invalid
}