const express = require("express")
const router = express.Router({mergeParams: true})
const wrapAsync = require("../utils/wrapAsync.js");
const ExpressError = require("../utils/ExpressError.js");
const Review = require("../models/review.js");
const Activity = require("../models/Activity.js")
const { validateReview, isLoggedIn, isReviewAuthor} = require("../middleware.js")


// Reviews
// POST route for adding a review to an activity
router.post("/", isLoggedIn, validateReview, wrapAsync(async (req, res) => {
    // console.log(req.params.id)
    const activity = await Activity.findById(req.params.id);
    const newReview = new Review(req.body.review);
    newReview.author = req.user._id;
    console.log(newReview)

    activity.reviews.push(newReview);
    await newReview.save();
    await activity.save();
    req.flash("success", "New Review Created");
    res.redirect(`/activities/${activity._id}`);
}));

// DELETE route for deleting a review
router.delete("/:reviewId",isLoggedIn, isReviewAuthor, wrapAsync(async (req, res) => {
    const { id, reviewId } = req.params;
    await Activity.findByIdAndUpdate(id, { $pull: { reviews: reviewId } });
    await Review.findByIdAndDelete(reviewId);
    req.flash("success", "Review Deleted");
    res.redirect(`/activities/${id}`);
}));

module.exports = router;