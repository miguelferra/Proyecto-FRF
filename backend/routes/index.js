const express = require("express");
const routerIndex = express.Router();
const productosRouter = require("./productos");
const inventarioRouter = require("./inventario");
const doctoresRouter = require("./doctores");
const ventasRouter = require("./ventas");

routerIndex.use("/productos", productosRouter);
routerIndex.use("/inventario", inventarioRouter);
routerIndex.use("/doctores",doctoresRouter);
routerIndex.use("/ventas",ventasRouter);

module.exports = routerIndex;