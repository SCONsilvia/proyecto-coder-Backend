const {persistenceChat : chatUser} = require("../persistence/persistence");

const { normalize, schema, denormalize } = require("normalizr");

const loggers = require("../utils/logs");

const getAllControllers = async (req, res) => {
    const respuesta = await chatUser.getAll();
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

const postControllers = async (req, res) => {
    const respuesta = await chatUser.save(req.body);
    if (!respuesta.status) {
        loggers().error(respuesta.err);
        return res.json({
            data: respuesta.err,
        });
    }
    return res.json({
        msg: `el chat se a creado existosamente su id es: ${respuesta.data}`,
    });
}

const getNormalizacionControllers = async (req, res) => {
    const respuesta = await chatUser.getAll();

    const user = new schema.Entity("users", {}, {
        idAttribute: "email",
    });

    const comment = new schema.Entity("mensaje", {
        author: user,
    }, {
        idAttribute: "_id",
    });

    const finalSchema = [comment];
    const normalizeData = normalize(respuesta.data, finalSchema);
    if (!respuesta.status) {
        loggers().error(respuesta.err);
        return res.json({
            data: respuesta.err,
        });
    }
    return res.json({
        data: normalizeData,
    });
}

const getDesnormalizacionControllers = async (req, res) => {
    const respuesta = await chatUser.getAll();

    const user = new schema.Entity("users", {}, {
        idAttribute: "email",
    });

    const comment = new schema.Entity("mensaje", {
        author: user,
    }, {
        idAttribute: "_id",
    });

    const finalSchema = [comment];
    const normalizeData = normalize(respuesta.data, finalSchema);
    const denormalizarData = denormalize(normalizeData.result, finalSchema, normalizeData.entities);
    if (!respuesta.status) {
        loggers().error(respuesta.err);
        return res.json({
            data: respuesta.err,
        });
    }
    return res.json({
        data: denormalizarData,
    });
}


module.exports = { getAllControllers, postControllers, getNormalizacionControllers, getDesnormalizacionControllers }
