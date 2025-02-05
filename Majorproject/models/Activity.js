/**
 * Activity Model
 * Defines the structure and behavior of adventure activities
 * Includes geo-spatial data, reviews, and owner relationships
 */
const validator = require("validator");
const mongoose = require('mongoose');
const Review = require('./review.js');

// Constants for maintainability
const DIFFICULTY_LEVELS = ['Beginner', 'Intermediate', 'Advanced', 'Expert'];
const DURATION_REGEX = /^\d+\s(hours?|days?|weeks?)$/i;
const MAX_IMAGES = 5;

const activitySchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Activity name is required'],
    trim: true,
    minlength: [3, 'Activity name must be at least 3 characters'],
    maxlength: [100, 'Activity name cannot exceed 100 characters'],
    index: true
  },
  description: {
    type: String,
    required: [true, 'Activity description is required'],
    trim: true,
    minlength: [50, 'Description must be at least 50 characters'],
    maxlength: [2000, 'Description cannot exceed 2000 characters']
  },
  images: {
    type: [{
      filename: {
        type: String,
        match: [/\.(jpg|jpeg|png)$/i, 'Invalid image file format']
      },
      url: {
        type: String,
        validate: {
          validator: v => validator.isURL(v, { protocols: ['http','https'] }),
          message: 'Invalid image URL'
        }
      }
    }],
    validate: {
      validator: v => v.length <= MAX_IMAGES,
      message: `Maximum ${MAX_IMAGES} images allowed`
    },
    required: [true, 'At least one image is required']
  },
  difficulty: {
    type: String,
    enum: {
      values: DIFFICULTY_LEVELS,
      message: `Difficulty must be one of: ${DIFFICULTY_LEVELS.join(', ')}`
    },
    required: [true, 'Difficulty level is required']
  },
  price: {
    type: Number,
    required: [true, 'Price is required'],
    min: [0, 'Price cannot be negative'],
    max: [10000, 'Price cannot exceed $10,000'],
    set: v => Math.round(v * 100) / 100 // Store as currency with 2 decimal places
  },
  location: {
    type: String,
    required: [true, 'Location is required'],
    trim: true,
    match: [/^[a-zA-Z0-9\s,'-]*$/, 'Invalid location format']
  },
  country: {
    type: String,
    required: [true, 'Country code is required'],
    uppercase: true,
    length: [2, 'Country code must be 2 characters'],
    match: [/^[A-Z]{2}$/, 'Invalid country code format']
  },
  duration: {
    type: String,
    required: [true, 'Duration is required'],
    match: [DURATION_REGEX, 'Invalid duration format (e.g., "2 hours" or "3 days")']
  },
  guideRequired: {
    type: Boolean,
    required: [true, 'Guide requirement must be specified'],
    default: false
  },
  createdAt: {
    type: Date,
    immutable: true,
    default: () => Date.now()
  },
  reviews: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Review'
  }],
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: [true, 'Activity owner is required']
  },
  geometry: {
    type: {
      type: String,
      enum: ['Point'],
      required: true
    },
    coordinates: {
      type: [Number],
      required: true,
      validate: {
        validator: function(v) {
          return v.length === 2 && 
                 v[0] >= -180 && v[0] <= 180 &&
                 v[1] >= -90 && v[1] <= 90;
        },
        message: 'Invalid coordinates format [longitude, latitude]'
      }
    }
  }
}, {
  timestamps: true, // Adds createdAt and updatedAt automatically
  toJSON: { virtuals: true }, // Include virtuals when converting to JSON
  toObject: { virtuals: true }
});

// Virtual for average rating (not stored in DB)
activitySchema.virtual('averageRating').get(function() {
  if (!this.reviews || this.reviews.length === 0) return 0;
  const total = this.reviews.reduce((sum, review) => sum + review.rating, 0);
  return (total / this.reviews.length).toFixed(1);
});

// Cascade delete reviews when activity is removed
activitySchema.post('findOneAndDelete', async function(doc) {
  try {
    if (doc?.reviews?.length) {
      await Review.deleteMany({ _id: { $in: doc.reviews } });
      console.log(`Deleted ${doc.reviews.length} associated reviews`);
    }
  } catch (err) {
    console.error('Error deleting associated reviews:', err);
  }
});

// Indexes for query optimization
activitySchema.index({ geometry: '2dsphere' }); // Geospatial queries
activitySchema.index({ difficulty: 1, price: 1 }); // Compound index
activitySchema.index({ owner: 1 }); // User-specific queries

module.exports = mongoose.model('Activity', activitySchema);