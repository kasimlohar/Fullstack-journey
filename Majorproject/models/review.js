const mongoose = require("mongoose");
const validator = require("validator");

const reviewSchema = new mongoose.Schema({
  rating: {
    type: Number,
    required: [true, "Rating is required"],
    min: [1, "Rating must be at least 1"],
    max: [5, "Rating cannot exceed 5"],
    validate: {
      validator: Number.isInteger,
      message: "Rating must be an integer"
    }
  },
  comment: {
    type: String,
    required: [true, "Comment is required"],
    trim: true,
    maxlength: [500, "Comment cannot exceed 500 characters"],
    validate: {
      validator: v => !validator.isEmpty(v),
      message: "Comment cannot be empty"
    }
  },
  activity: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Activity",
    required: [true, "Activity reference is required"]
  },
  author: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: [true, "Author reference is required"]
  },
  editedAt: Date
}, {
  timestamps: true,
  toJSON: {
    virtuals: true,
    transform: function(doc, ret) {
      delete ret.__v;
      return ret;
    }
  }
});

// Virtual for formatted date
reviewSchema.virtual("formattedDate").get(function() {
  return this.createdAt.toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric"
  });
});

// Update activity rating when review changes
reviewSchema.post("save", async function() {
  const Review = this.constructor; // Get the Review model
  const activity = this.activity;
  
  const stats = await Review.aggregate([
    {
      $match: { activity: activity }
    },
    {
      $group: {
        _id: '$activity',
        avgRating: { $avg: '$rating' }
      }
    }
  ]);
  
  // Update activity with new average
  try {
    await mongoose.model('Activity').findByIdAndUpdate(activity, {
      averageRating: stats[0]?.avgRating || 0
    });
  } catch (e) {
    console.error('Error updating activity rating:', e);
  }
});

// Fix: Remove the old post remove hook and update with findOneAndDelete
reviewSchema.pre('findOneAndDelete', async function(next) {
    try {
        const review = await this.model.findOne(this.getQuery());
        if (review) {
            const Activity = mongoose.model('Activity');
            await Activity.findByIdAndUpdate(review.activity, {
                $pull: { reviews: review._id }
            });
        }
        next();
    } catch (err) {
        next(err);
    }
});

// Update rating calculation after delete
reviewSchema.post('findOneAndDelete', async function(doc) {
    if (doc) {
        const Activity = mongoose.model('Activity');
        const results = await Review.aggregate([
            { $match: { activity: doc.activity } },
            { $group: { _id: null, avg: { $avg: '$rating' } } }
        ]);
        
        await Activity.findByIdAndUpdate(doc.activity, {
            averageRating: results.length ? results[0].avg : 0
        });
    }
});

async function calculateActivityRating(activityId) {
  const result = await this.aggregate([
    { $match: { activity: activityId } },
    { $group: { _id: "$activity", avgRating: { $avg: "$rating" } } }
  ]);

  await mongoose.model("Activity").findByIdAndUpdate(activityId, {
    averageRating: result[0]?.avgRating || 0
  });
}

// Indexes
reviewSchema.index({ activity: 1 });
reviewSchema.index({ author: 1 });
reviewSchema.index({ createdAt: -1 });

module.exports = mongoose.model("Review", reviewSchema);