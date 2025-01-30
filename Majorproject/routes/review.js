const express = require("express")
const router = express.Router({mergeParams: true})
const wrapAsync = require("../utils/wrapAsync.js");
const ExpressError = require("../utils/ExpressError.js");
const Review = require("../models/review.js");
const Activity = require("../models/Activity.js")
const { validateReview, isLoggedIn, isReviewAuthor} = require("../middleware.js")
const reviewController = require("../controllers/reviews.js")

// Reviews
// POST route for adding a review to an activity
router.post("/", isLoggedIn, validateReview, wrapAsync(reviewController.createReview));

// DELETE route for deleting a review
router.delete("/:reviewId",isLoggedIn, isReviewAuthor, wrapAsync(reviewController.destroyReview));

module.exports = router;