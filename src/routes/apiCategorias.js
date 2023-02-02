const config = require("../config/index");

const { getAllControllers, getByIdControllers, postControllers, putControllers, deleteControllers } = require("../controllers/categorias.controllers");

const { Router } = require("express");

const rutaApiChat = Router();

function validarDatos(req, res, next) {
    const { nombre, descripcion } = req.body;
    if (!nombre || !descripcion ) {
		return res.status(400).json({
			msg: "Campos invalidos ",
		});
	}
    next();
}

function administrador(req, res, next) {
    if (!config.administrador) {
        return res.status(401).json({
            metodo: req.method,
            ruta: req.baseUrl+ req.path,
            err : "No tienes las autorizacion requeridad",
        });
    }
    next();
}

rutaApiChat.get("/", getAllControllers);

rutaApiChat.get("/:id", getByIdControllers)

rutaApiChat.post("/", administrador, validarDatos, postControllers)

rutaApiChat.put("/:id", administrador, validarDatos, putControllers)

rutaApiChat.delete("/:id", administrador, deleteControllers);

module.exports = rutaApiChat;
