const express = require("express");
const router = express.Router();
//const productosSchema = require("../schemas/productos");
//const {validarDatos} = require("../middleware/index");
const inventarioController = require("../controller/inventario");

router.get("/",inventarioController.obtenerInventario);
router.put("/:_id",inventarioController.modificar);
router.delete("/:_id",inventarioController.eliminar);

module.exports = router;