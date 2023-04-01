const { ChatsModel } = require("../models/chat")
const loggers = require("../../../../utils/logs");
// para la normaliizacion
function adapater(data){
    return data.map((element) => {
        element._doc._id=element._doc._id.toString();
        return element._doc
    })
}

class ControllersChat{
    async save(user, data){
        try {
            const nuevoChat = await ChatsModel.create({user: user, mensaje: data.mensaje});
            return { data: nuevoChat._id, status: true, err: null };
        } catch(err) {
            loggers().error(err);
            return { data: null, status: false, err: err };
        }
    }

    async getAll(){
        try {
            const data = await ChatsModel.find({});
            return { data: adapater(data), status: true, err: null };
        } catch(err) {
            return { data: null, status: false, err: err };
        }
    }
}

module.exports = ControllersChat;
