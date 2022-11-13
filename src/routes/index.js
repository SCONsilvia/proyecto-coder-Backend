const {Router} = require("express");
const apiProductosRouter =  require("./apiProductos");
const apiRutaCarrito = require("./apiCarrito");
const apiChat = require("./apiChat");

const rutaPrincipal = Router();

const urlNoValida = Router()


urlNoValida.all("", (req,res) =>{
    return res.status(404).json({
        metodo: req.method,
        ruta: req.baseUrl+ req.path,
        msg: "Url no implementada"
    })
})

rutaPrincipal.use("/api/productos", apiProductosRouter);
rutaPrincipal.use("/api/carrito", apiRutaCarrito);
rutaPrincipal.use("/api/chat", apiChat);
rutaPrincipal.use("/*", urlNoValida);/*Cualquier cosa */
module.exports = rutaPrincipal;