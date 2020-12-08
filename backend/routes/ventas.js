const express = require("express");
const router = express.Router();
const ventaSchema = require("../schemas/ventas");
const validate = require("../middleware/validatedata");
const ventaController = require("../controller/ventas");

router.post("/",validate(ventaSchema),ventaController.agregar);
router.get("/",ventaController.obtenerVentas);
router.put("/:_id",ventaController.modificar);
router.delete("/:_id",ventaController.eliminar);

module.exports = router;