const Joi = require("joi");

const schema = Joi.object({
    nombre:Joi.string().min(1).max(45).required(),
    clasificacion:Joi.string().min(1).max(45).required(),
    precio:Joi.number().required()
});

module.exports = schema;