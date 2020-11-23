const mongoose = require("mongoose");
const {Schema} = mongoose;

const schema = new Schema({
    nombre:{type:String, required: true},
    clasificacion:{type:String, required: true},
    precio:{type:String, required: true},
},{timestamps:true});

const model = mongoose.model("productos", schema);
module.exports = model;