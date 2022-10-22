const {Router} = require("express");
const apiProductosRouter =  require("./apiProductos");
const productosRouter =  require("./productos");

const rutaPrincipal = Router();

rutaPrincipal.use("/api/productos", apiProductosRouter);
rutaPrincipal.use("/productos", productosRouter);
module.exports = rutaPrincipal;