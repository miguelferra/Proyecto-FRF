const {modelosMongoDB:{detalleVentaModel}} = require("../database/index");

const agregar = async(req, res) =>{
    try{
        const detalleVenta = new detalleVentaModel(req.body);
        await detalleVenta.save();
    
        res.send(`Detalle ha sido creado`);
    }catch (error) {
        res.status(404).send(error);
    }

}

const obtenerDetalle= async(req, res)=>{
    try{
        const doctor = await doctoresModel.find();
        res.json(doctor);
    }catch (error) {
        res.status(404).send(error);    
    }    
}

const modificar = async (req,res)=>{
    try{
        const {nombre, cedula} = req.body;
        const {_id} = req.params;
        await doctoresModel.findByIdAndUpdate(_id,  {nombre, cedula});
    res.send(`Se ha actualizado el doctor`);
    }catch (error) {
        res.status(404).send(error);
    }   
}

const eliminar = async (req,res) =>{
    try{
        const {_id} = req.params;
        await doctoresModel.deleteOne({_id});
        res.send(`Eliminado`);
    }catch (error) {
        res.status(404).send(error);
    }  
}


module.exports = {
    agregar,
    obtenerDoctores,
    modificar,
    eliminar
}