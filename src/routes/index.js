const {Router} = require("express");
const apiProductosRouter =  require("./apiProductos");
const {rutaProductos} =  require("./productos");
const apiRutaCarrito = require("./apiCarrito")

const rutaPrincipal = Router();

rutaPrincipal.use("/api/productos", apiProductosRouter);
rutaPrincipal.use("/api/carrito", apiRutaCarrito);
rutaPrincipal.use("/productos", rutaProductos);
module.exports = rutaPrincipal;