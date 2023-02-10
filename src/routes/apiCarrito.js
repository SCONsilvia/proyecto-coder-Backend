const { Router } = require("express");
const rutaCarrito = Router();

const { getDataControllers, postControllers, deleteProductControllers, deleteAllCarritoControllers, getFinalizarCompraControllers } = require("../controllers/carrito.controllers");

function validarDatos(req, res, next) {
    const { idProducto, cantidad } = req.body;
    if (!idProducto || !cantidad) {
        loggers().error("Campos invalidos");
		return res.status(400).json({
			msg: "Campos invalidos",
		});
	}
    next();
}

rutaCarrito.post("/", validarDatos, postControllers);

rutaCarrito.get("/", getDataControllers)

rutaCarrito.delete("/", deleteProductControllers);

rutaCarrito.delete("/allCarrito", deleteAllCarritoControllers);

rutaCarrito.get("/finalizarCompra", getFinalizarCompraControllers);

module.exports = rutaCarrito;
