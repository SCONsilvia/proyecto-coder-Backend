const config = require("../config/index");

const ControllersProductos = require("../controllers/productos");

const contenedor = new ControllersProductos();
const { Router } = require("express");
const rutaApiProductos = Router();

const loggers = require("../utils/logs");

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

rutaApiProductos.get("/", async (req, res) => {
    const respuesta = await contenedor.getAll();
    if (!respuesta.status) {
        loggers().error(respuesta.err);
        return res.json({
            data: respuesta.err,
        });
    }
    return res.json({
        data: respuesta.data,
    });
});

rutaApiProductos.get("/:id", async (req, res) => {
    const id = req.params.id;
    const respuesta = await contenedor.getById(id);
    if (!respuesta.status) {
        loggers().error(respuesta.err);
        return res.json({
            data: respuesta.err,
        });
    }
    return res.json({
        data: respuesta.data,
    });
});

rutaApiProductos.post("/", administrador, validarDatos, async (req,res) => {
    const respuesta = await contenedor.save(req.body);
    if (!respuesta.status) {
        loggers().error(respuesta.err);
        return res.json({
            data: respuesta.err,
        });
    }
    return res.json({
        msg: `el producto se a creado existosamente su id es: ${respuesta.data}`,
    });
});

rutaApiProductos.put("/:id", administrador, validarDatos, async (req, res) => {
    const id = req.params.id;
    const respuesta = await contenedor.actualizarPorId(id, req.body);
    if (!respuesta.status) {
        loggers().error(respuesta.err);
        return res.json({
            data: respuesta.err,
        });
    }
    return res.json({
        msg: `Elemento actualizado exitosamente`,
    });
});

rutaApiProductos.delete("/:id", administrador, async (req, res) => {
    const id = req.params.id;
    const respuesta = await contenedor.deleteById(id);
    if(!respuesta.status){
        loggers().error(respuesta.err);
        return res.json({
            data: respuesta.err,
        });
    }
    return res.json({
        msg: `Elemento eliminado exitosamente`,
    });
})

module.exports = rutaApiProductos;
