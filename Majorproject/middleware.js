// Improved Code 

const Activity = require("./models/Activity");
const Review = require("./models/review");
const ExpressError = require("./utils/ExpressError");
const { activitySchema, reviewSchema } = require("./schema");
const { validationResult } = require('express-validator');
const rateLimit = require('express-rate-limit');


module.exports = {
  // Authentication middleware
  requireAuth: (req, res, next) => {
    if (!req.isAuthenticated()) {
      req.session.returnTo = req.originalUrl;
      req.flash("error", "You must be logged in to perform this action");
      return res.redirect("/login");
    }
    next();
  },

  // Session handling middleware
  preserveReturnTo: (req, res, next) => {
    if (req.session.returnTo) {
      res.locals.returnTo = req.session.returnTo;
    }
    next();
  },

  // Authorization middleware
  checkOwnership: async (req, res, next) => {
    try {
      const { id } = req.params;
      const activity = await Activity.findById(id)
        .populate('owner')
        .orFail(() => {
          throw new ExpressError('Activity not found', 404);
        });

      if (!activity.owner.equals(req.user._id)) {
        req.flash("error", "You don't have permission to modify this activity");
        return res.redirect(`/activities/${id}`);
      }
      
      res.locals.activity = activity;
      next();
    } catch (err) {
      next(err);
    }
  },

  // Validation middleware
  validateActivity: (req, res, next) => {
    try {
        // Skip image validation as it's handled by multer
        const { error } = activitySchema.validate(req.body);
        if (error) {
            const msg = error.details.map(el => el.message).join(', ');
            throw new ExpressError(msg, 400);
        }
        next();
    } catch (err) {
        next(err);
    }
  },

  // Review authorization middleware
  checkReviewAuthor: async (req, res, next) => {
    try {
      const { reviewId } = req.params;
      const review = await Review.findById(reviewId)
        .orFail(() => {
          throw new ExpressError('Review not found', 404);
        });

      if (!review.author.equals(req.user._id)) {
        req.flash("error", "You don't have permission to modify this review");
        return res.redirect(`/activities/${req.params.id}`);
      }
      
      res.locals.review = review;
      next();
    } catch (err) {
      next(err);
    }
  },

  // Validation middleware for reviews
  validateReview: (req, res, next) => {
    const { error } = reviewSchema.validate(req.body);
    if (error) {
        console.log("Validation error:", error); // Debug log
        const msg = error.details.map(el => el.message).join(',');
        req.flash('error', msg);
        return res.redirect(`/activities/${req.params.id}`);
    }
    next();
  },

  // Error handling middleware
  handleErrors: (err, req, res, next) => {
    const { statusCode = 500, message = 'Something went wrong!' } = err;
    if (!req.originalUrl.startsWith('/api')) {
      req.flash('error', message);
      return res.status(statusCode).redirect('/error');
    }
    res.status(statusCode).json({ error: message });
  },

  // Role-based access control
  requireRole: (...roles) => (req, res, next) => {
    if (!roles.includes(req.user?.role)) {
      req.flash('error', 'Insufficient permissions');
      return res.redirect('/activities');
    }
    next();
  },

//   Rate limiting middleware
  apiLimiter: rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 100,
    message: 'Too many requests from this IP, please try again later'
  })
};
