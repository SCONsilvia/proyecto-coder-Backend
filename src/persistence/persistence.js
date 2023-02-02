const { initMongoDB } = require("./mongodb/db/database");
const ControllersProductos = require("./mongodb/controllers/productos");
const ControllersCarrito = require("./mongodb/controllers/carrito");
const ControllersUsers = require("./mongodb/controllers/users");
const ControllersChat = require("./mongodb/controllers/chat");
const ControllersCategoria = require("./mongodb/controllers/categorias");


let persistenceProductos, persistenceCarrito, persistenceUsuarios, persistenceChat, persistenceCategory;
let argv = process.argv[2];
// let argv = process.env.PERSISTENCE;

/**
 * if (argv === 'file') {
 * persistence = new File('./src/persistence/filesystem/db.json');
 * }
 */

switch (argv) {
    case 'mongo':
        initMongoDB();
        persistenceProductos = new ControllersProductos();
        persistenceCarrito = new ControllersCarrito();
        persistenceUsuarios = new ControllersUsers();
        persistenceChat = new ControllersChat();
        persistenceCategory = new ControllersCategoria();
        console.log(`arg: ${argv}`);
        break;
    default:
        initMongoDB();
        persistenceProductos = new ControllersProductos();
        persistenceCarrito = new ControllersCarrito();
        persistenceUsuarios = new ControllersUsers();
        persistenceChat = new ControllersChat();
        persistenceCategory = new ControllersCategoria();
        console.log(`arg: ${argv}`);
        break;
};

/* export async function save(obj) {
    return await persistence.save(obj);
};

export async function getAll() {
    return await persistence.getAll();
}; */

module.exports = { persistenceProductos, persistenceCarrito, persistenceUsuarios, persistenceChat, persistenceCategory };