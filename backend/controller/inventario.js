const {modelosMongoDB:{inventarioModel}} = require("../database/index");

const agregar = async(producto) =>{
    //Id del producto
    const inventario = new inventarioModel({cantidad: "0"});
    inventario.idProducto = producto;
    await inventario.save();

    //const { producto } = req.body;
    //const producto = await productosModel.findById({_id});
}

const obtenerInventario = async(req, res)=>{
        const inventario = await inventarioModel.find().populate('idProducto');
        res.json(inventario);
}

const modificar = async (req,res)=>{
    const {cantidad} = req.body;
    const {_id} = req.params;
    await inventarioModel.findByIdAndUpdate(_id, {cantidad});
    res.send(`Se ha actualizado el inventario`);
}

const eliminar = async (req,res) =>{
    const {_id} = req.params;
    await inventarioModel.deleteOne({_id});
    res.send(`Eliminado`);
}


module.exports = {
    agregar,
    obtenerInventario,
    modificar,
    eliminar
}