const { initMongoDB } = require("./mongodb/db/database");
const ControllersUsers = require("./mongodb/controllers/users");

let daoUsuarios;
let argv = process.argv[2];

class UsersFactory {
    constructor() {
        switch (argv) {
            case 'mongo':
                daoUsuarios = new ControllersUsers();
                break;
            default:
                daoUsuarios = new ControllersUsers();
                break;
        };
    }

    async save(data) {
        return await daoUsuarios.save(data);
    }
    
    async getById(data) {
        return await daoUsuarios.encontrarUnUsuario(data);
    }
    
    async login(email, contrasena) {
        return await daoUsuarios.buscarUsuarioEmailContrasena(email, contrasena);
    }
    
    async getDao() {
        return daoUsuarios;
    };
}

const usersFactory = new UsersFactory;

module.exports = { usersFactory };
