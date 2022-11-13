const ContenedorDeChat = require("../contenedorDeChat")
const chatUser = new ContenedorDeChat("chat.txt");

const {Router} = require("express");
const rutaApiChat = Router();

rutaApiChat.get("/", async (req,res)=>{
    const respuesta = await chatUser.getAll();
    console.log(respuesta);
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