const { asDto } = require("../dto/chat.dto");
const { chatFactory } = require("../daos/chat.factory");
const { usersRepository } = require("../repository/users.repository");

class ChatRepository {
    constructor() {
        this.dao = chatFactory.getDao();
    }

    async save(user, data) {
        return await chatFactory.save(user,data);
    }
    
    async getAll() {
        const chat = await chatFactory.getAll();
        if(chat.data){
            const chatDtoo = asDto(chat.data);
            chat.data =  chatDtoo;
            const dataChatModificado = await Promise.all(chat.data.map(async (unChat) => { 
                const dataUsuario = await usersRepository.getById(unChat.user);
                unChat.user = dataUsuario.data;
                return unChat;
            }));
            chat.data = dataChatModificado;
        }
        return chat;
    }
}

const chatRepository = new ChatRepository;

module.exports = { chatRepository };