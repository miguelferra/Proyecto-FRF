const mongoose = require("mongoose");
const {Schema} = mongoose;

const schema = new Schema({
    nombre:{type:String, required: true},
    cedula:{type:String, required: true},
},{timestamps:true});

const model = mongoose.model("doctores", schema);
module.exports = model;