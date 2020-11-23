const moongose = require("mongoose");
const {Schema} = moongose;

const schema = new Schema({
    cantidad:{type:Number, required:true},
    idProducto: {type: Schema.Types.ObjectId, ref: "productos"}
}, {timestamps:true})

const model = moongose.model("inventario", schema);
module.exports = model;