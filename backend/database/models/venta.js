const { number } = require("joi");
const mongoose = require("mongoose");
const {Schema} = mongoose;

const schema = new Schema({
    idDoctor: {type: Schema.Types.ObjectId, ref: "doctores"},
    detalle: {type: Schema.Types.Array, ref: "detalleVenta"},
    total:{type:Number, required: true}
},{timestamps:true});

const model = mongoose.model("ventas", schema);
module.exports = model;