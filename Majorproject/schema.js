const Joi = require('joi');


module.exports.activitySchema = Joi.object({
    activity : Joi.object({
        name: Joi.string().required(),
        description: Joi.string().required(),
        location: Joi.string().required(),
        duration: Joi.string().required(),
        price: Joi.number().required().min(0),
        difficulty: Joi.string().required(),
        image: Joi.string().allow("", null),

    }).required(),
});

module.exports.reviewSchema = Joi.object({
    review: Joi.object({
        rating: Joi.number().required().min(1).max(5),
        comment: Joi.string().required(),
    }).required(),
});