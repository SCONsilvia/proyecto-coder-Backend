const { initMongoDB } = require("./mongodb/db/database");
const ControllersProductos = require("./mongodb/controllers/productos");

let daoProductos;
let argv = process.argv[2];

class ProductsFactory {
    constructor() {
        switch (argv) {
            case 'mongo':
                daoProductos = new ControllersProductos();
                break;
            default:
                daoProductos = new ControllersProductos();
                break;
        };
    }

    async save(data) {
        return await daoProductos.save(data);
    }
    
    async getAll() {
        return await daoProductos.getAll();
    }
    
    async getById(id) {
        return await daoProductos.getById(id);
    }

    async getByCategoryId(id) {
        return await daoProductos.getByCategoryId(id);
    }

    async actualizarPorId(id, nuevaData) {
        return await daoProductos.actualizarPorId(id, nuevaData);
    }

    async deleteAll() {
        return await daoProductos.deleteAll();
    }

    async deleteById(id) {
        return await daoProductos.deleteById(id);
    }
    
    async getDao() {
        return daoProductos;
    };
}

const productsFactory = new ProductsFactory;

module.exports = { productsFactory };