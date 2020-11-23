const {modelosMongoDB:{doctoresModel}} = require("../database/index");

const agregar = async(req, res) =>{

    //Id del producto
    const doctor = new doctoresModel(req.body);
    await doctor.save();

    res.send(`${doctor.nombre} ha sido creado`);

}

const obtenerDoctores= async(req, res)=>{
        const doctor = await doctoresModel.find();
        res.json(doctor);
}

const modificar = async (req,res)=>{
    const {nombre, cedula} = req.body;
    const {_id} = req.params;
    await doctoresModel.findByIdAndUpdate(_id,  {nombre, cedula});
    res.send(`Se ha actualizado el doctor`);
}

const eliminar = async (req,res) =>{
    const {_id} = req.params;
    await doctoresModel.deleteOne({_id});
    res.send(`Eliminado`);
}


module.exports = {
    agregar,
    obtenerDoctores,
    modificar,
    eliminar
}