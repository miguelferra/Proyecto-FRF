const mongoose = require("mongoose");
const {mongoURI} = require("../config");

const checkConnection = () =>{
    return mongoose.connection.readyState;
}

const connect = async () => {
    try {
        if(!checkConnection()) {
            console.log("Conectando...");
            await mongoose.connect(mongoURI,{ useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify:false});
        }
        console.log("Conectado a MongoDB");
    } catch (error) {
        console.log(error);
    }
}

module.exports = {
    connect,
    checkConnection
}