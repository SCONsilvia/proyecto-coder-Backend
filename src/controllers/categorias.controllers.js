const {categoryRepository : contenedor} = require("../persistence/repository/category.repository");

const getAllControllers = async (req, res) => {
    const respuesta = await contenedor.getAll();
    if(!respuesta.status){
        return res.status(404).json({
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
    if(!respuesta.status){
        return res.status(404).json({
            data: respuesta.err,
        });
    }
    return res.json({
        data: respuesta.data,
    });
}

const postControllers = async (req,res) => {
    const respuesta = await contenedor.save(req.body);
    if (!respuesta.status) {
        return res.status(404).json({
            data: respuesta.err,
        });
    }
    return res.json({
        msg: `La categoria se a creado existosamente su id es: ${respuesta.data}`,
    });
}

const putControllers = async(req, res) => {
    const id = req.params.id;
    const respuesta = await contenedor.actualizarPorId(id, req.body);
    if(!respuesta.status){
        return res.status(404).json({
            data: respuesta.err,
        });
    }
    return res.json({
        msg: `Elemento actualizado exitosamente`,
    });
}
const deleteControllers = async(req, res) => {
    const id = req.params.id;
    const respuesta = await contenedor.deleteById(id);
    if(!respuesta.status){
        return res.status(404).json({
            data: respuesta.err,
        });
    }
    return res.json({
        msg: `Elemento eliminado exitosamente`,
    });
}

module.exports = { getAllControllers, getByIdControllers, postControllers, putControllers, deleteControllers }
