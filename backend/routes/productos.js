const express = require("express");
const router = express.Router();
//const productosSchema = require("../schemas/productos");
//const {validarDatos} = require("../middleware/index");
const productosController = require("../controller/productos");

router.post("/",productosController.agregar);
router.get("/",productosController.obtenerProductos);
router.put("/:_id",productosController.modificar);
router.delete("/:_id",productosController.eliminar);

module.exports = router;