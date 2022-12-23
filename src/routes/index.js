const {Router} = require("express");
const apiProductosRouter =  require("./apiProductos");
const apiRutaCarrito = require("./apiCarrito");
const apiChat = require("./apiChat");
const apiCategoria = require("./apiCategorias");
const apiFaker = require("./apiFaker");
const login = require("./apiLogin");
const routerProcess = require("./apiProcess");

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
rutaPrincipal.use("/api/categoria", apiCategoria);
rutaPrincipal.use("/api/productos-test", apiFaker);
rutaPrincipal.use("/api/login", login);
rutaPrincipal.use("/api/process", routerProcess);
rutaPrincipal.use("/*", urlNoValida);/*Cualquier cosa */
module.exports = rutaPrincipal;