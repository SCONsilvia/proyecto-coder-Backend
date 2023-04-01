const { Router } = require("express");
const rutaApiChat = Router();

const { getAllControllers, postControllers, getNormalizacionControllers, getDesnormalizacionControllers } = require("../controllers/chat.controllers");
const loggers = require("../utils/logs");
function validarDatos(req, res, next) {
    const { mensaje } = req.body;
    if (!mensaje) {
        loggers().error("Campos invalidos");
		return res.status(400).json({
			msg: "Campos invalidos",
		});
	}
    next();
}

rutaApiChat.get("/", getAllControllers);

rutaApiChat.post("/", validarDatos, postControllers);

rutaApiChat.get("/normalizacion", getNormalizacionControllers);

rutaApiChat.get("/desnormalizar", getDesnormalizacionControllers);

module.exports = rutaApiChat;
