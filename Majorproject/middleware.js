const Activity = require("./models/Activity")
const Review = require("./models/review.js")
const ExpressError = require("./utils/ExpressError.js");
const { activitySchema, reviewSchema } = require("./schema.js");
const review = require("./models/review.js");

module.exports.isLoggedIn = (req, res, next) => {
    console.log(req.path, "..", req.originalUrl);
    if(!req.isAuthenticated()){
        req.session.redirectUrl = req.originalUrl;
        req.flash("error", "You Must be logged in to add activities");
        return res.redirect("/login")
    }
    next();
}

module.exports.saveRedirectUrl = (req, res, next) => {
    if(req.session.redirectUrl){
        res.locals.redirectUrl = req.session.redirectUrl
    }
    next();
}


module.exports.isOwner = async (req, res, next) => {
    const { id } = req.params;
    let activity = await Activity.findById(id);
    if(!activity.owner.equals(res.locals.currUser._id)) {
        req.flash("error", "You are not the owner of this activity");
        return res.redirect(`/activities/${id}`)
    }
    next();
}
// Middleware to validate activity data using Joi schema
module.exports.validateActivity = (req, res, next) => {
    let { error } = activitySchema.validate(req.body);
    if (error) {
        let errMsg = error.details.map((el) => el.message).join(",");
        throw new ExpressError(errMsg, 400);
    } else {
        next();
    }
};

// Middleware to validate review data using Joi schema
module.exports.validateReview = (req, res, next) => {
    let { error } = reviewSchema.validate(req.body);
    if (error) {
        let errMsg = error.details.map((el) => el.message).join(",");
        throw new ExpressError(errMsg, 400);
    } else {
        next();
    }
};

module.exports.isReviewAuthor = async (req, res, next) => {
    const { id, reviewId } = req.params;
    let review = await Review.findById(reviewId);
    if(!review.author.equals(res.locals.currUser._id)) {
        req.flash("error", "You are not the author of this Review");
        return res.redirect(`/activities/${id}`)
    }
    next();
}

