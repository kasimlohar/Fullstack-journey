const Activity = require("../models/Activity")
const Review = require("../models/review")

module.exports.createReview = async (req, res) => {
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
}

module.exports.destroyReview = async (req, res) => {
    const { id, reviewId } = req.params;
    await Activity.findByIdAndUpdate(id, { $pull: { reviews: reviewId } });
    await Review.findByIdAndDelete(reviewId);
    req.flash("success", "Review Deleted");
    res.redirect(`/activities/${id}`);
}