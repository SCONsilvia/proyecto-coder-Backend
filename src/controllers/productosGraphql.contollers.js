const { productsRepository : contenedor } = require("../persistence/repository/products.repository");

const loggers = require("../utils/logs");

const getAllControllers = async () => {
    const respuesta = await contenedor.getAll();
    return respuesta.data
}

const getByIdControllers = async (args) => {
    const { id } = args;
    const respuesta = await contenedor.getById(id);
    return respuesta.data
}

const saveControllers = async (args) => {
    const { data } = args;
    const respuesta = await contenedor.save(data);
    return respuesta.data
}

const putControllers = async (args) => {
    const { id, data } = args;
    const respuesta = await contenedor.actualizarPorId(id, data);
    return respuesta.data
}

const deleteControllers = async (args) => {
    const { id } = args;
    const respuesta = await contenedor.deleteById(id);
    return respuesta.status
}

module.exports = { getAllControllers, getByIdControllers, saveControllers, putControllers, deleteControllers }
