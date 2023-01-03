const config = require("../config/index");

const ControllersCategoria = require("../controllers/categorias");
const contenedor = new ControllersCategoria();

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

rutaApiChat.get("/", async (req, res) => {
    const respuesta = await contenedor.getAll();
    if(!respuesta.status){
        return res.json({
            data: respuesta.err,
        });
    }
    return res.json({
        data: respuesta.data,
    });
});

rutaApiChat.get("/:id", async (req, res) => {
    const id = req.params.id;
    const respuesta = await contenedor.getById(id);
    if(!respuesta.status){
        return res.json({
            data: respuesta.err,
        });
    }
    return res.json({
        data: respuesta.data,
    });
})

rutaApiChat.post("/", administrador, validarDatos, async (req,res) => {
    const respuesta = await contenedor.save(req.body);
    if (!respuesta.status) {
        return res.json({
            data: respuesta.err,
        });
    }
    return res.json({
        msg: `el producto se a creado existosamente su id es: ${respuesta.data}`,
    });
})

rutaApiChat.put("/:id", administrador, validarDatos, async(req, res) => {
    const id = req.params.id;
    const respuesta = await contenedor.actualizarPorId(id, req.body);
    if(!respuesta.status){
        return res.json({
            data: respuesta.err,
        });
    }
    return res.json({
        msg: `Elemento actualizado exitosamente`,
    });
})

rutaApiChat.delete("/:id", administrador, async(req, res) => {
    const id = req.params.id;
    const respuesta = await contenedor.deleteById(id);
    if(!respuesta.status){
        return res.json({
            data: respuesta.err,
        });
    }
    return res.json({
        msg: `Elemento eliminado exitosamente`,
    });
});

module.exports = rutaApiChat;
