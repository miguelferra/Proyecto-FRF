const express = require("express");
const routerIndex = express.Router();
const productosRouter = require("./productos");
const inventarioRouter = require("./inventario");
const doctoresRouter = require("./doctores");

routerIndex.use("/productos", productosRouter);
routerIndex.use("/inventario", inventarioRouter);
routerIndex.use("/doctores",doctoresRouter);

module.exports = routerIndex;