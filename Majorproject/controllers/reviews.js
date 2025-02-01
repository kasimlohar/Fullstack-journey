const Activity = require("../models/Activity");
const Review = require("../models/review");

module.exports = {
  createReview: async (req, res) => {
    try {
      const activity = await Activity.findById(req.params.id);
      if (!activity) {
        req.flash("error", "Activity not found");
        return res.redirect("/activities");
      }

      // Check for existing review
      const existingReview = await Review.findOne({
        author: req.user._id,
        activity: activity._id
      });

      if (existingReview) {
        req.flash("error", "You already reviewed this activity");
        return res.redirect(`/activities/${activity._id}`);
      }

      const review = new Review({
        ...req.body.review,
        author: req.user._id,
        activity: activity._id
      });

      await review.save();
      activity.reviews.push(review);
      await activity.save();

      req.flash("success", "Successfully added review!");
      res.redirect(`/activities/${activity._id}`);
    } catch (err) {
      req.flash("error", "Failed to create review");
      res.redirect(`/activities/${req.params.id}`);
    }
  },

  destroyReview: async (req, res) => {
    try {
      const { id, reviewId } = req.params;
      
      await Activity.findByIdAndUpdate(id, {
        $pull: { reviews: reviewId }
      });

      await Review.findOneAndDelete({
        _id: reviewId,
        author: req.user._id
      });

      req.flash("success", "Successfully deleted review");
      res.redirect(`/activities/${id}`);
    } catch (err) {
      req.flash("error", "Failed to delete review");
      res.redirect(`/activities/${id}`);
    }
  }
};