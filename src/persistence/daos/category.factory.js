const { initMongoDB } = require("./mongodb/db/database");
const ControllersCategoria = require("./mongodb/controllers/categorias");

let categoryUsuarios;
let argv = process.argv[2];

class CategoryFactory {
    constructor() {
        switch (argv) {
            case 'mongo':
                categoryUsuarios = new ControllersCategoria();
                break;
            default:
                categoryUsuarios = new ControllersCategoria();
                break;
        };
    }

    async save(data) {
        return await categoryUsuarios.save(data);
    }
    
    async getAll() {
        return await categoryUsuarios.getAll();
    }
    
    async getById(id) {
        return await categoryUsuarios.getById(id);
    }

    async actualizarPorId(id, nuevaData) {
        return await categoryUsuarios.actualizarPorId(id, nuevaData);
    }

    async deleteById(id) {
        return await categoryUsuarios.deleteById(id);
    }
    
    async getDao() {
        return categoryUsuarios;
    };
}

const categoryFactory = new CategoryFactory;

module.exports = { categoryFactory };
