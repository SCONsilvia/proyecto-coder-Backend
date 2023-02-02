const config = require("../config/index");

const { Router } = require("express");
const rutaApiProductos = Router();

const { getAllControllers, getByIdControllers, saveControllers, putControllers, deleteControllers } = require("../controllers/productos.controllers");

function validarDatos(req, res, next) {
    const { nombre, descripcion, codigo, foto, precio, stock } = req.body;
    if (!nombre || !descripcion || !codigo || !foto || !precio || !stock) {
        loggers().error("Campos invalidos");
		return res.status(400).json({
			msg: "Campos invalidos",
		});
	}
    next();
}

function administrador(req, res, next){
    if (!config.administrador) {
        loggers().error("No tienes las autorizacion requeridad");
        return res.status(401).json({
            metodo: req.method,
            ruta: req.baseUrl + req.path,
            err: "No tienes las autorizacion requeridad",
        });
    }
    next();
}

rutaApiProductos.get("/", getAllControllers);

rutaApiProductos.get("/:id", getByIdControllers);

rutaApiProductos.post("/", administrador, validarDatos, saveControllers);

rutaApiProductos.put("/:id", administrador, validarDatos, putControllers);

rutaApiProductos.delete("/:id", administrador, deleteControllers);

module.exports = rutaApiProductos;
