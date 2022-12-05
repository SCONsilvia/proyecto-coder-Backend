const {ChatsModel} = require("../models/chat")

//para la normaliizacion
function adapater(data){
    return data.map((element)=>{
        element._doc._id=element._doc._id.toString()
        return element._doc
    })
}

class ControllersChat{
    async save(data){
        try{
            const nuevoChat = await ChatsModel.create(data);
            return {data:nuevoChat._id, status: true, err:null};
        }catch(err){
            console.log("hubo un error en el guardado del mensaje", err);
            return {data:null, status: false, err:err};
        }
    }

    async getAll(){
        try{
            const data = await ChatsModel.find({});
            return {data:adapater(data), status: true, err:null};
        }catch(err){
            return {data:null, status: false, err:err};
        }
    }
}

module.exports = ControllersChat;