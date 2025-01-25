const Joi = require("joi");

// Schema for validating activity data
module.exports.activitySchema = Joi.object({
  name: Joi.string().required(), // Activity name is required
  description: Joi.string().required(), // Description is required
  location: Joi.string().required(), // Location is required
  duration: Joi.string().required(), // Duration is required
  price: Joi.number().required().min(0).max(10000), // Price is required and must be between 0 and 10,000
  difficulty: Joi.string()
    .valid("Easy", "Medium", "Hard", "Extreme") // Only allow specific values
    .required(), // Difficulty is required
  country: Joi.string().required(), // Country is required
  guideRequired: Joi.boolean(), // Guide required is required
  images: Joi.array()
    .items(
      Joi.object({
        filename: Joi.string().required(), // Image filename is required
        url: Joi.string().required(), // Image URL is required
      })
    )
    .min(1) // At least one image is required
    .optional(), // Images array is optional
});

// Schema for validating review data
module.exports.reviewSchema = Joi.object({
  review: Joi.object({
    rating: Joi.number().required().min(1).max(5), // Rating is required and must be between 1 and 5
    comment: Joi.string().required(), // Comment is required
  }).required(), // The entire review object is required
});