const express = require("express");
const router = express.Router();
const inventarioSchema = require("../schemas/inventario");
const validate = require("../middleware/validatedata");
const inventarioController = require("../controller/inventario");

router.get("/",inventarioController.obtenerInventario);
router.get("/existencia",inventarioController.obtenerInventarioExistente);
router.put("/:_id",validate(inventarioSchema),inventarioController.modificar);
router.delete("/:_id",inventarioController.eliminar);

module.exports = router;