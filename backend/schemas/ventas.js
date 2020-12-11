const Joi = require("joi");

const schema = Joi.object({
    idDoctor:Joi.string().allow(null).allow(""),
    detalle: Joi.array().items({
        idProducto: Joi.string(),
        cantidad: Joi.number().min(1).required(),
        precio: Joi.number().required()
    }),
    total:Joi.number().required()
});

module.exports = schema;
