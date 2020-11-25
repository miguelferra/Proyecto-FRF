const Joi = require("joi");

const schema = Joi.object({
    nombre:Joi.string().min(1).max(45).required(),
    cedula:Joi.string().min(1).max(45).required(),
});

module.exports = schema;