const {modelosMongoDB:{productosModel}} = require("../database/index");
const inventarioController = require("./inventario");

const agregar = async(req, res) =>{
    
    const producto = new productosModel(req.body);
    await producto.save();


    inventarioController.agregar(producto);

    res.send(`${producto.nombre} ha sido creado`);
}

const obtenerProductos = async(req, res)=>{
        const cursos = await productosModel.find();
        res.json(cursos);
}

const modificar = async (req,res)=>{
    const {nombre, clasificacion, precio} = req.body;
    const {_id} = req.params;
    await productosModel.findByIdAndUpdate(_id, {nombre, clasificacion, precio});
    res.send(`${nombre} ha sido actualizado`);
}

const eliminar = async (req,res) =>{
    const {_id} = req.params;
    await productosModel.deleteOne({_id});
    res.send(`Eliminado`);
}

module.exports = {
    agregar,
    obtenerProductos,
    modificar,
    eliminar
}