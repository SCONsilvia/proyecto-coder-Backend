const { Router } = require("express");
const passport = require("passport");
const apiProductosRouter = require("./apiProductos");
const apiRutaCarrito = require("./apiCarrito");
const apiChat = require("./apiChat");
const apiCategoria = require("./apiCategorias");
const apiFaker = require("./apiFaker");
const login = require("./apiLogin");
const routerProcess = require("./apiProcess");
const loggers = require("../utils/logs");

const rutaPrincipal = Router();

const urlNoValida = Router();

urlNoValida.all("", (req, res) => {
    loggers().warn(`La ruta ${req.baseUrl + req.path} no es valida`);
    return res.status(404).json({
        metodo: req.method,
        ruta: req.baseUrl + req.path,
        msg: "Url no implementada",
    });
});

const yargs = require("yargs/yargs");
const { hideBin } = require("yargs/helpers");
const argv = yargs(hideBin(process.argv)).argv;
const cluster = require("cluster");
rutaPrincipal.get("/puerto", (req, res) => {
    return res.json({
        pid: process.pid,
        ruta: req.baseUrl + req.path,
        msg: `HOLA desde puerto ${argv.port}`
    });
});

const checkToken = (req,res,next) =>{
    passport.authenticate('jwt', {session: false})(req,res)
    next()
}


rutaPrincipal.use("/api/productos", apiProductosRouter);
rutaPrincipal.use("/api/carrito",checkToken, apiRutaCarrito);
rutaPrincipal.use("/api/chat",checkToken, apiChat);
rutaPrincipal.use("/api/categoria", apiCategoria);
rutaPrincipal.use("/api/productos-test", apiFaker);
rutaPrincipal.use("/api/login", login);
rutaPrincipal.use("/api/process", routerProcess);
rutaPrincipal.use("/*", urlNoValida); /* Cualquier cosa */

module.exports = rutaPrincipal;
