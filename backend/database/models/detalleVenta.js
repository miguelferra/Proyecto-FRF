const moongose = require("mongoose");
const {Schema} = moongose;

const schema = new Schema({
    idProducto: {type: Schema.Types.ObjectId, ref: "productos"},
    cantidad:{type:Number, required:true},
    precio:{type:Number, required:true}
}, {timestamps:true})

const model = moongose.model("detalleVentas", schema);
module.exports = model;