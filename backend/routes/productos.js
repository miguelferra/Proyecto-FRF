const express = require("express");
const router = express.Router();
const productosSchema = require("../schemas/productos");
const validate = require("../middleware/validatedata");
const productosController = require("../controller/productos");

router.post("/", validate(productosSchema),productosController.agregar);
router.get("/",productosController.obtenerProductos);
router.get("/productosCategoria/:clasificacion",productosController.obtenerProductosClasificacion);
router.get("/productosNombre/:nombre",productosController.obtenerProductoNombre);
router.put("/:_id", validate(productosSchema),productosController.modificar);
router.delete("/:_id",productosController.eliminar);

module.exports = router;