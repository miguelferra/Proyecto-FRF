const {modelosMongoDB:{ventasModel}} = require("../database/index");
const productosController = require("./productos");

//Esto
const agregar = async(req,res) =>{
    //Recibe idDoctor, detalles, fecha, total
    const { idDoctor, detalle, total } = req.body;

        try{
            const venta = new ventasModel({ idDoctor, detalle, total });
            //inventario.idProducto = producto;
            await venta.save();
            res.json("Se registro correctamente");
        } catch (error) {
            res.status(400).send(error);
        }
}

/** Preguntar a Ramses
 * 
const calcularTotal = async(detalle,total) =>{
    var totalBack = 0;
    for (var i = 0; i < detalle.length; i++) {
        total += parseFloat(detalle[i].precio);
        console.log( await productosController.obtenerProductoID(detalle[i].idProducto));
    }
    if(totalBack != total){
        return false;
    }else{
        return true;
    }
}
*/

const obtenerVentas = async(req, res)=>{
    try{
        const ventas = await ventasModel.find().populate('idDoctor').populate({
            path: 'detalle.idProducto',
            model: 'productos'
       });
       if(ventas.length === 0){
        res.status(204).send("No hay ventas registradas");
        }else{
            res.json(ventas);
        } 
    }catch (error) {
        res.status(400).send(error);
    }
}

const modificar = async (req,res)=>{
    try{
        const { idDoctor, detalle, total}= req.body;
        const {_id} = req.params;
        await ventasModel.findByIdAndUpdate(_id, { idDoctor, detalle, total});
        res.send(`La venta ha sido actualizada`);
    }catch (error) {
        res.status(400).send(error);
    }
}

const eliminar = async (req,res) =>{
    try{
        const id = req.params;
        await productosModel.deleteOne(id);
    
        res.send(`Venta eliminada correctamente`);
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