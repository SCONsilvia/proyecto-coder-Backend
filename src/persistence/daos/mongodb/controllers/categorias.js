const { CategoryModel } = require("../models/categorias");

// no en uso por ahora
class ControllersCategoria {
    async save(data) {
        try {
            const nuevoCategoria = await CategoryModel.create(data);
            return { data: nuevoCategoria._id, status: true, err: null } ;
        } catch(err) {
            console.log("hubo un error en el guardado", err);
            return { data: null, status: false, err: err };
        }
    }

    async getAll(){
        try {
            const data = await CategoryModel.find();
            return { data: data, status: true, err: null };
        } catch(err) {
            return { data: null, status: false, err: err };
        }
    }

    async getById(id){
        try {
            const data = await CategoryModel.findById(id);
            if (!data) {
                return { data: null, status: false, err: "no existe esa categoria" };
            }
            return { data: data, status: true, err: null };
        } catch(err) {
            return { data: null, status: false, err: err };
        }
    }

    async actualizarPorId(id, nuevaData){
        try {
            const data = await CategoryModel.findById(id);
            if (data == null) {
                return { data: null, status: false, err: "Elemento no encontrado" };
            }
            const productoActualizado = await CategoryModel.findByIdAndUpdate(id, nuevaData, { new: true });
            return { data: productoActualizado, status: true, err: null };
        } catch(err) {
            console.log(err);
            return { data: null, status: false, err: err };
        }
    }

    async deleteById(id){
        try {
            const data = await CategoryModel.findByIdAndDelete(id)
            if (data == null) {
                return { data: null, status: false, err: "Elemento no encontrado" };
            }
            return { data: null, status: true, err: null };
        } catch(err) {
            return { data: null, status: false, err: err };
        }
    }
}

module.exports = ControllersCategoria;
