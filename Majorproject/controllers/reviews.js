const Activity = require("../models/Activity");
const Review = require("../models/review");

module.exports.createReview = async (req, res) => {
    try {
        console.log("Creating review with data:", req.body); // Debug log
        const activity = await Activity.findById(req.params.id);
        if (!activity) {
            req.flash('error', 'Activity not found');
            return res.redirect('/activities');
        }

        const review = new Review({
            ...req.body.review,
            author: req.user._id,
            activity: activity._id
        });

        console.log("Review object:", review); // Debug log

        await review.save();
        activity.reviews.push(review);
        await activity.save();

        req.flash('success', 'Review added successfully!');
        return res.redirect(`/activities/${activity._id}`);
    } catch (err) {
        console.error('Review creation error:', err); // Better error logging
        req.flash('error', `Failed to create review: ${err.message}`);
        return res.redirect(`/activities/${req.params.id}`);
    }
};

// Remove deleteReview and keep only destroyReview with fixed logic
module.exports.destroyReview = async (req, res) => {
    try {
        const { id, reviewId } = req.params;
        
        // First check if review exists
        const review = await Review.findById(reviewId);
        if (!review) {
            req.flash('error', 'Review not found');
            return res.redirect(`/activities/${id}`);
        }

        // Remove from activity first
        await Activity.findByIdAndUpdate(id, { 
            $pull: { reviews: reviewId } 
        });

        // Then delete the review
        await Review.findByIdAndDelete(reviewId);
        
        req.flash('success', 'Review deleted successfully');
        return res.redirect(`/activities/${id}`);
    } catch (err) {
        console.error('Review deletion error:', err);
        // Don't show error message if deletion was successful
        if (err.name === 'CastError') {
            req.flash('error', 'Invalid review ID');
        }
        return res.redirect(`/activities/${req.params.id}`);
    }
};