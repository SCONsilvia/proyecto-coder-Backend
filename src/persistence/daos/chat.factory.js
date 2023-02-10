const { initMongoDB } = require("./mongodb/db/database");
const ControllersChat = require("./mongodb/controllers/chat");

let daoChat;
let argv = process.argv[2];

class ChatFactory {
    constructor() {
        switch (argv) {
            case 'mongo':
                daoChat = new ControllersChat();
                break;
            default:
                daoChat = new ControllersChat();
                break;
        };
    }

    async save(user, data) {
        return await daoChat.save(user, data);
    }
    
    async getAll() {
        return await daoChat.getAll();
    }

    async getDao() {
        return daoChat;
    };
}

const chatFactory = new ChatFactory;

module.exports = { chatFactory };
