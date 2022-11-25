const ControllersChat = require("../controllers/chat")
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