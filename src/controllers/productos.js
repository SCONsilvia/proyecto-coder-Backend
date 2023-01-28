const { ProductsModel } = require("../models/productos");
const { CategoryModel } = require("../models/categorias");

class ControllersProductos {    
    async save(data){
        try {
            const nuevoProducto = await ProductsModel.create(data);
            return { data: nuevoProducto._id, status: true, err: null };
        }catch(err){
            console.log("hubo un error en el guardado", err);
            return { data: null, status: false, err: err };
        }
    }

    async getAll(){
        try {
            const data = await ProductsModel.find({});
            return { data: data, status: true, err: null };
        } catch(err) {
            return { data: null, status: false, err: err };
        }
    }

    async getById(id){
        try {
            const data = await ProductsModel.findById(id);
            if (data == null) {
                return { data: null, status: false, err: "no existe esa data" };
            }
            return { data: data, status: true, err: null };
        } catch(err) {
            return { data: null, status: false, err: err };
        }
    }

    async actualizarPorId(id, nuevaData){
        try {
            const data = await ProductsModel.findById(id);
            if (data == null) {
                return { data: null, status: false, err: "Elemento no encontrado" };
            }
            const productoActualizado = await ProductsModel.findByIdAndUpdate(id, nuevaData,{new: true});
            return { data: productoActualizado, status: true, err: null };
        } catch(err) {
            console.log(err);
            return { data: null, status: false, err: err };
        }
    }

    async deleteAll(){
        try {
            await ProductsModel.deleteMany();
            return { data: null, status: true, err: null };
        } catch(err) {
            console.log("Ocurrio un error al borrar todo", err)
            return { data: null, status: false, err: err };
        }  
    }

    async deleteById(id){
        try {
            const data = await ProductsModel.findByIdAndDelete(id)
            if (data == null) {
                return { data: null, status: false, err: "Elemento no encontrado" };
            }
            return { data: null, status: true, err: null };
        } catch(err) {
            console.log(err);
            return { data: null, status: false, err: err };
        }
    }
}

module.exports = ControllersProductos;
