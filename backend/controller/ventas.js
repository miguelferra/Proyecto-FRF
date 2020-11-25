const {modelosMongoDB:{ventasModel}} = require("../database/index");

//Esto
const agregar = async(req,res) =>{
    //Recibe idDoctor, detalles, fecha, total
    const { idDoctor, detalle, fecha, total } = req.body;
    //const { idUsuario } = req.params;
    try{
        const venta = new ventasModel({ idDoctor, detalle, fecha, total });
        //inventario.idProducto = producto;
        await venta.save();
        res.json("Se registro correctamente");
    } catch (error) {
        res.status(400).send(error);
    }
}

const obtenerVentas = async(req, res)=>{
        const ventas = await ventasModel.find().populate('idDoctor');
        res.json(ventas);
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
    obtenerVentas,
    modificar,
    eliminar
}