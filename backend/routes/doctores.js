const express = require("express");
const router = express.Router();
//const productosSchema = require("../schemas/productos");
//const {validarDatos} = require("../middleware/index");
const doctoresController = require("../controller/doctores");

router.post("/",doctoresController.agregar);
router.get("/",doctoresController.obtenerDoctores);
router.put("/:_id",doctoresController.modificar);
router.delete("/:_id",doctoresController.eliminar);

module.exports = router;