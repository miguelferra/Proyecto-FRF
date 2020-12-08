const {modelosMongoDB:{productosModel}} = require("../database/index");
const inventarioController = require("./inventario");

const agregar = async(req, res) =>{
    try{

    //Registra el producto en la bd
    const producto = new productosModel(req.body);
    await producto.save();

    //Agregar inventario con 0
    inventarioController.agregar(producto);

    res.send(`${producto.nombre} ha sido creado`);
    } catch (error) {
        res.status(400).send(error);
    }
}

const obtenerProductos = async(req, res)=>{
    try{
        const productos = await productosModel.find();
        res.json(productos);
    } catch (error) {
        res.status(400).send(error);
    }
}

const obtenerProductoNombre = async(req, res) =>{
    try{
        const {nombre} = req.params;
        const productosNombre = await productosModel.find({nombre: {$eq: nombre}});
        if(productosNombre.length === 0){
            res.status(204).send("El producto no fue encontrado");
        }else{
            res.json(productosNombre);
        } 
    } catch (error) {
        res.status(400).send(error);
    }
}

const obtenerProductoID = async(id) =>{
    try{
            const producto =  await productosModel.findById(id);
            return producto;
    } catch (error) {
        res.status(400).send(error);
    }
}
const obtenerProductosClasificacion = async(req,res) =>{
    try{
        const {clasificacion} = req.params;
        const productosClas = await productosModel.find({clasificacion: {$eq: clasificacion}});
        if(productosClas.length === 0){
            res.status(204).send("El producto no fue encontrado");
        }else{
            res.json(productosClas);
        } 
    } catch (error) {
        res.status(400).send(error);
    }
}

const obtenerClasificaciones = async(req,res) =>{
    try{
        let productosClas = ["Antibiotico","Analgesico","Antialérgico","Antidiarreico","Antiinflamatorios", "Suplemento","Vitamina","Crema","Higiene","Shampoo","Jarabe","Otro"]
        res.send(productosClas);
    } catch (error) {
        res.status(400).send(error);
    }
}

const modificar = async (req,res)=>{
    try{
        const {nombre, clasificacion, precio} = req.body;
        const {_id} = req.params;
        await productosModel.findByIdAndUpdate(_id, {nombre, clasificacion, precio});
        res.send(`${nombre} ha sido actualizado`);
    } catch (error) {
        res.status(400).send(error);
    }
}

const eliminar = async (req,res) =>{
    try{
        const id = req.params;
        await productosModel.deleteOne(id);
        
        inventarioController.eliminar(id);
        res.send(`Eliminado el producto`);
    } catch (error) {
        res.status(400).send(error);
    }
    
}

module.exports = {
    agregar,
    obtenerProductos,
    obtenerProductoID,
    obtenerClasificaciones,
    obtenerProductosClasificacion,
    obtenerProductoNombre,
    modificar,
    eliminar
}