const {modelosMongoDB:{inventarioModel}} = require("../database/index");

const agregar = async(producto) =>{
    try{
        const inventario = new inventarioModel({cantidad: "0"});
        inventario.idProducto = producto;
        await inventario.save();
    } catch (error) {
        res.status(404).send(error);
    }
}

const obtenerInventario = async(req, res)=>{
    try{
        const inventario = await inventarioModel.find().populate('idProducto');
        res.json(inventario);
    }catch (error) {
        res.status(404).send(error);
    }
}

const ventaInventario = async(idProducto,cantidadVenta)=>{
    try{
    const inventario = await inventarioModel.find({idProducto: {$eq: idProducto}}).populate('idProducto');
    if(inventario[0].cantidad >= cantidadVenta){
        var cantidad = (inventario[0].cantidad - cantidadVenta);
        await inventarioModel.findByIdAndUpdate(inventario[0]._id, {cantidad});
        return true;
    }else{
        return false;
    }
    }catch (error) {
    return  false;
    }
}

const obtenerInventarioExistente = async(req,res) =>{
    try{
    const inventarioExistente = await inventarioModel.find({cantidad: {$gt: 0}}).populate('idProducto');
    res.json(inventarioExistente);
    }catch (error) {
        res.status(404).send(error);
    }
}

const modificar = async (req,res)=>{
    try{
        const {cantidad} = req.body;
        const {_id} = req.params;
        await inventarioModel.findByIdAndUpdate(_id, {cantidad});
        res.send(`Se ha actualizado el inventario`);
    }catch (error) {
        res.status(404).send(error);
    }
}

const eliminar = async (id) =>{
    try{
        //Obtiene los datos de iventario por id del producto
    const inventarioEncontrado = await inventarioModel.find({idProducto: {$eq: id}});
    await inventarioModel.findByIdAndDelete(inventarioEncontrado[0]._id);
    }catch (error) {
        res.status(404).send(error);
    }
    
}


module.exports = {
    agregar,
    obtenerInventario,
    ventaInventario,
    obtenerInventarioExistente,
    modificar,
    eliminar
}