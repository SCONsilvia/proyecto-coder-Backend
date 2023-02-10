const { initMongoDB } = require("./mongodb/db/database");
const ControllersCarrito = require("./mongodb/controllers/carrito");

let daoCarrito;
let argv = process.argv[2];

class CarritoFactory {
    constructor() {
        switch (argv) {
            case 'mongo':
                daoCarrito = new ControllersCarrito();
                break;
            default:
                daoCarrito = new ControllersCarrito();
                break;
        };
    }

    async save(data, user) {
        return await daoCarrito.save(data, user);
    }
    
    async deleteProductById(idProducto, user) {
        return await daoCarrito.deleteProductById(idProducto, user);
    }
    
    async deleteTodoElCarritoById(user) {
        return await daoCarrito.deleteTodoElCarritoById(user);
    }

    async getById(user) {
        return await daoCarrito.getById(user);
    }

    async finalizarCompra(user) {
        return await daoCarrito.finalizarCompra(user);
    }
    
    async getDao() {
        return daoCarrito;
    };
}

const carritoFactory = new CarritoFactory;

module.exports = { carritoFactory };