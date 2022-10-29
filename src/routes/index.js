const {Router} = require("express");
const apiProductosRouter =  require("./apiProductos");
const {rutaProductos} =  require("./productos");

const rutaPrincipal = Router();

rutaPrincipal.use("/api/productos", apiProductosRouter);
rutaPrincipal.use("/productos", rutaProductos);
module.exports = rutaPrincipal;