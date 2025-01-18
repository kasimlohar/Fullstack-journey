// const mongoose = require('mongoose');
// const Schema = mongoose.Schema;

// const listingSchema = new Schema({
//     title: {
//         type: String,
//         required: true,
//     },
//     price: Number,
//     description: String,
//     location: String,
//     image: {
//         type: String,
//         default: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQwHqBcjpKzRmeS1A9a_I4WEDSMv_e3Fb6uJg&s',
//         set: (v) => v === ""? 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQwHqBcjpKzRmeS1A9a_I4WEDSMv_e3Fb6uJg&s': v
//     },
//     difficulty: String,
//     country: String,
// });

// const Listing = mongoose.model('Listing', listingSchema);

// module.exports = Listing;


const mongoose = require('mongoose');

// Define the schema for an Activity
const activitySchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  description: {
    type: String,
    required: true,
    trim: true,
  },
  images: [{
    filename: { type: String, required: true },  // image filename
    url: { type: String, required: true },       // image URL (if storing in cloud)
  }],
  difficulty: {
    type: String,
    enum: ['Easy', 'Medium', 'Hard', 'Extreme'],
    required: true,
  },
  price: {
    type: Number,
    required: true,
    min: 0,  // Price should be a positive number
  },
  location: {
    type: String,
    required: true,
    trim: true,
  },
  country: {
    type: String,
    required: true,
    trim: true,
  },
  duration: {
    type: String,
    required: true,
    trim: true, // e.g., "2 hours" or "1 day"
  },
  guideRequired: {
    type: Boolean,
    default: false,  // Whether the activity requires a guide or not
  },
  createdAt: {
    type: Date,
    default: Date.now,  // Automatically sets the creation date to current date
  },
});

// Create the model from the schema
const Activity = mongoose.model('Activity', activitySchema);

module.exports = Activity;
