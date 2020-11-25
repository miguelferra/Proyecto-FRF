const express = require("express");
const router = express.Router();
const detalleVentaSchema = require("../schemas/doctores");
const validate = require("../middleware/validatedata");
const doctoresController = require("../controller/doctores");

router.post("/",validate(doctoresSchema),doctoresController.agregar);
router.get("/",doctoresController.obtenerDoctores);
router.put("/:_id", validate(doctoresSchema),doctoresController.modificar);
router.delete("/:_id",doctoresController.eliminar);

module.exports = router;