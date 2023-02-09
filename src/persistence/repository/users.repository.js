const {UsersDTO, asDto} = require("../dto/users.dto");
const {daoUsuarios} = require("../daos/factory");

class UsersRepository {
    constructor() {
        this.dao = daoUsuarios;
    }

    async getById(id) {
        const users = await this.dao.encontrarUnUsuario(id);
        console.log("user");
        console.log(users);
        const usersDto = asDto(users.data);
        console.log("dto");
        console.log(usersDto);
        return usersDto;
    }
}

module.exports = {UsersRepository};
