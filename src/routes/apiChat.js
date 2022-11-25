let ControllersChat;
//para que funcione el glich
if (process.env.MODE == "desarrollo") {
    ControllersChat = require("../controllers/chat")
}else{
    ControllersChat = require("../contenedorDeChat");
}

const chatUser = new ControllersChat();

const {Router} = require("express");
const rutaApiChat = Router();

rutaApiChat.get("/", async (req,res)=>{
    const respuesta = await chatUser.getAll();
    if(!respuesta.status){
        return res.json({
            data: respuesta.err
        })
    }
    return res.json({
        data: respuesta.data
    })
})

module.exports = rutaApiChat;