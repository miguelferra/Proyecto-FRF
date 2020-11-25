const Joi = require("joi");

const schema = Joi.object({
    cantidad:Joi.number().required(),
    idProducto: Joi.string()
});

module.exports = schema;