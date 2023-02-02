const { Router } = require("express");
const rutaApiChat = Router();

const { getAllControllers, postControllers, getNormalizacionControllers, getDesnormalizacionControllers } = require("../controllers/chat.controllers");

rutaApiChat.get("/", getAllControllers);

rutaApiChat.post("/", postControllers);

rutaApiChat.get("/normalizacion", getNormalizacionControllers);

rutaApiChat.get("/desnormalizar", getDesnormalizacionControllers);

module.exports = rutaApiChat;
