const mongoose = require('mongoose');
const Review = require("./review.js"); // Import the Review model

// Define the schema for an Activity
const activitySchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true, // Automatically trims whitespace
  },
  description: {
    type: String,
    required: true,
    trim: true, // Automatically trims whitespace
  },
  image: {
    filename: String, // Image filename is optional
    url: String,      // Image URL is optional
  },
  difficulty: {
    type: String,
    enum: ['Easy', 'Medium', 'Hard', 'Extreme'], // Only allows specific values
    required: true,
  },
  price: {
    type: Number,
    required: true,
    min: 0, // Ensures price is a non-negative number
    max: 10000, // Ensures price does not exceed 10,000
  },
  location: {
    type: String,
    required: true,
    trim: true, // Automatically trims whitespace
  },
  country: {
    type: String,
    required: true,
    trim: true, // Automatically trims whitespace
  },
  duration: {
    type: String,
    required: true,
    trim: true,
    // match: /^\d+\s*(hour|day|week|month)s?$/i, // Matches formats like "2 hours", "1 day", etc.
  },
  // guideRequired: {
  //   type: Boolean,
  //   default: false,  // Defaults to false if not provided
  // },
  createdAt: {
    type: Date,
    default: Date.now,  // Automatically sets to the current date and time
  },
  reviews: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Review", // References the Review model for populating reviews
    },
  ],
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  geometry: {
    type: {
      type: String, // Don't do `{ location: { type: String } }`
      enum: ['Point'], // 'location.type' must be 'Point'
      required: true
    },
    coordinates: {
      type: [Number],
      required: true
    }
  }
});

// Middleware to delete associated reviews when an activity is deleted
activitySchema.post("findOneAndDelete", async (activity) => {
  if (activity) {
    // Delete all reviews associated with the activity
    await Review.deleteMany({ _id: { $in: activity.reviews } });
  }
});

// Indexes for performance optimization
activitySchema.index({ location: 1 }); // Index on location
activitySchema.index({ difficulty: 1 }); // Index on difficulty
activitySchema.index({ price: 1 }); // Index on price

// Create the Activity model from the schema
const Activity = mongoose.model('Activity', activitySchema);

// Export the Activity model
module.exports = Activity;