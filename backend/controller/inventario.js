const {modelosMongoDB:{inventarioModel}} = require("../database/index");

const agregar = async(producto) =>{
    try{
        const inventario = new inventarioModel({cantidad: "0"});
        inventario.idProducto = producto;
        await inventario.save();
    } catch (error) {
        res.status(400).send(error);
    }
}

const obtenerInventario = async(req, res)=>{
    const inventario = await inventarioModel.find().populate('idProducto');
    res.json(inventario);
}

const obtenerInventarioExistente = async(req,res) =>{
    const inventarioExistente = await inventarioModel.find({cantidad: {$gt: 0}}).populate('idProducto');
    res.json(inventarioExistente);
}

const modificar = async (req,res)=>{
    try{
        const {cantidad} = req.body;
        const {_id} = req.params;
        await inventarioModel.findByIdAndUpdate(_id, {cantidad});
        res.send(`Se ha actualizado el inventario`);
    }catch (error) {
        res.status(400).send(error);
    }
}

const eliminar = async (id) =>{
    try{
        //Obtiene los datos de iventario por id del producto
    const inventarioEncontrado = await inventarioModel.find({idProducto: {$eq: id}});
    await inventarioModel.findByIdAndDelete(inventarioEncontrado[0]._id);
    }catch (error) {
        res.status(400).send(error);
    }
    
}


module.exports = {
    agregar,
    obtenerInventario,
    obtenerInventarioExistente,
    modificar,
    eliminar
}