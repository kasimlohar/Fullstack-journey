/**
 * Data Validation Schemas
 * Uses Joi for request payload validation
 * Includes activity and review schemas
 */

const Joi = require("joi");
// const { MAX_IMAGE_SIZE } = require("./utils/constants.js");

// Common validation patterns
const COMMON = {
  STRING: Joi.string().trim(), //removed .escapeHTML()
  NUMBER: Joi.number(),
  REQUIRED_STRING: Joi.string().trim().required(), //removed .escapeHTML()
  REQUIRED_NUMBER: Joi.number().required(),
};

// Shared validation constants
const VALIDATION = {
  ACTIVITY: {
    PRICE_MIN: 0,
    PRICE_MAX: 10000,
    DIFFICULTY: ["Beginner", "Intermediate", "Advanced", "Expert"],
    DURATION_REGEX: /^\d+\s(hours?|days?|weeks?)$/,
    IMAGE_LIMIT: 5,
  },
  REVIEW: {
    RATING_MIN: 1,
    RATING_MAX: 5,
    COMMENT_MAX: 500,
  }
};


// Schema definitions
const SCHEMAS = {
  ACTIVITY: Joi.object({
    name: COMMON.REQUIRED_STRING.min(3).max(100)
      .messages({
        "string.min": "Activity name must be at least {#limit} characters",
        "string.max": "Activity name cannot exceed {#limit} characters"
      }),
    
    description: COMMON.REQUIRED_STRING.min(50).max(2000)
      .messages({
        "string.min": "Description must be at least {#limit} characters",
        "string.max": "Description cannot exceed {#limit} characters"
      }),
    
    location: COMMON.REQUIRED_STRING.pattern(/^[a-zA-Z0-9\s,'-]*$/)
      .message("Invalid location format"),
    
    duration: COMMON.REQUIRED_STRING.pattern(VALIDATION.ACTIVITY.DURATION_REGEX)
      .message("Invalid duration format (e.g., '2 hours' or '3 days')"),
    
    price: COMMON.REQUIRED_NUMBER.min(VALIDATION.ACTIVITY.PRICE_MIN)
      .max(VALIDATION.ACTIVITY.PRICE_MAX)
      .precision(2)
      .messages({
        "number.min": `Price must be at least $${VALIDATION.ACTIVITY.PRICE_MIN}`,
        "number.max": `Price cannot exceed $${VALIDATION.ACTIVITY.PRICE_MAX}`
      }),
    
    difficulty: COMMON.REQUIRED_STRING.valid(...VALIDATION.ACTIVITY.DIFFICULTY)
      .messages({
        "any.only": `Difficulty must be one of: ${VALIDATION.ACTIVITY.DIFFICULTY.join(", ")}`
      }),
    
    country: COMMON.REQUIRED_STRING.length(2).uppercase()
      .messages({
        "string.length": "Country code must be 2 characters (e.g., US, CA)"
      }),
    
    guideRequired: Joi.boolean().required()
      .messages({
        "boolean.base": "Guide requirement must be a boolean value"
      })
  }).options({ abortEarly: false }), // Return all validation errors

  REVIEW: Joi.object({
    review: Joi.object({
      rating: COMMON.REQUIRED_NUMBER.integer()
        .min(VALIDATION.REVIEW.RATING_MIN)
        .max(VALIDATION.REVIEW.RATING_MAX)
        .messages({
          "number.base": "Rating must be a number",
          "number.integer": "Rating must be a whole number",
          "number.min": `Rating must be at least ${VALIDATION.REVIEW.RATING_MIN}`,
          "number.max": `Rating cannot exceed ${VALIDATION.REVIEW.RATING_MAX}`
        }),
      
      comment: COMMON.STRING.max(VALIDATION.REVIEW.COMMENT_MAX)
        .messages({
          "string.max": `Comment cannot exceed ${VALIDATION.REVIEW.COMMENT_MAX} characters`
        })
        .required()
    }).required()
  }).options({ abortEarly: false })
};

const reviewSchema = Joi.object({
    review: Joi.object({
        rating: Joi.number().required().min(1).max(5).integer(),
        comment: Joi.string().required().trim()
    }).required()
});

module.exports = {
  activitySchema: SCHEMAS.ACTIVITY,
  reviewSchema: SCHEMAS.REVIEW
};