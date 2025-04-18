const Joi = require('joi');

module.exports.listingSchema = Joi.object({        //inside joi object there should be an object whose name is 
                                         //listing    
    listing  : Joi.object({
        title: Joi.string().required(),
        description: Joi.string().required(),
        image:Joi.string(),
        location: Joi.string().required(),
        country: Joi.string().required(),
        price: Joi.number().required(),
        
    }).required()
});

module.exports.reviewSchema = Joi.object({
    review:Joi.object({
        rating: Joi.number().required().min(1).max(5),
        comment: Joi.string().required(),
    }).required(),
})

