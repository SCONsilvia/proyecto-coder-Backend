const { asDto } = require("../dto/users.dto");
const { usersFactory } = require("../daos/usuario.factory");

class UsersRepository {
    constructor() {
        this.dao = usersFactory.getDao();
    }

    async getById(id) {
        const users = await usersFactory.getById(id);
        if(users.data){
            const usersDto = asDto(users.data);
            users.data =  usersDto;
        }
        return users;
    }

    async save(data) {
        return await usersFactory.save(data);
    }
    
    async getByIdPuro(data) {
        return await usersFactory.getById(data);
    }
    
    async login(email, contrasena) {
        return await usersFactory.login(email, contrasena);
    }
}

const usersRepository = new UsersRepository;

module.exports = { usersRepository };
