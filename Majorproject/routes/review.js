const express = require("express")
const router = express.Router({mergeParams: true})
const wrapAsync = require("../utils/wrapAsync.js");
const ExpressError = require("../utils/ExpressError.js");
const { reviewSchema } = require("../schema.js");
const Review = require("../models/review.js");
const Activity = require("../models/Activity.js")


// Middleware to validate review data using Joi schema
const validateReview = (req, res, next) => {
    let { error } = reviewSchema.validate(req.body);
    if (error) {
        let errMsg = error.details.map((el) => el.message).join(",");
        throw new ExpressError(errMsg, 400);
    } else {
        next();
    }
};


// Reviews
// POST route for adding a review to an activity
router.post("/", validateReview, wrapAsync(async (req, res) => {
    // console.log(req.params.id)
    const activity = await Activity.findById(req.params.id);
    const newReview = new Review(req.body.review);

    activity.reviews.push(newReview);
    await newReview.save();
    await activity.save();
    req.flash("success", "New Review Created");
    res.redirect(`/activities/${activity._id}`);
}));

// DELETE route for deleting a review
router.delete("/:reviewId", wrapAsync(async (req, res) => {
    const { id, reviewId } = req.params;
    await Activity.findByIdAndUpdate(id, { $pull: { reviews: reviewId } });
    await Review.findByIdAndDelete(reviewId);
    req.flash("success", "Review Deleted");
    res.redirect(`/activities/${id}`);
}));

module.exports = router;