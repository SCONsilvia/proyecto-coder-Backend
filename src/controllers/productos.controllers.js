const {daoProductos : contenedor} = require("../persistence/daos/factory");

const loggers = require("../utils/logs");

const getAllControllers = async (req, res) => {
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
}

const getByIdControllers = async (req, res) => {
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
}

const saveControllers = async (req,res) => {
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
}

const putControllers = async (req, res) => {
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
}

const deleteControllers = async (req, res) => {
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
}

module.exports = { getAllControllers, getByIdControllers, saveControllers, putControllers, deleteControllers }
