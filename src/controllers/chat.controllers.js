const {chatRepository : chatUser} = require("../persistence/repository/chat.repository");

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
    if(!req.session.passport){
        return res.json({
            msj: "tienes que registrarte antes dec omentar",
        });
    }
    const idUser = req.session.passport.user;
    console.log(req.body);
    const respuesta = await chatUser.save(idUser, req.body);
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
