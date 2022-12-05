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

const {normalize, schema, denormalize} = require("normalizr")


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

rutaApiChat.post("/", async (req,res)=>{
    const respuesta = await chatUser.save(req.body);
    if(!respuesta.status){
        return res.json({
            data: respuesta.err
        })
    }
    return res.json({
        msg: `el chat se a creado existosamente su id es: ${respuesta.data}`
    })
})

rutaApiChat.get("/normalizacion", async (req,res)=>{
    const respuesta = await chatUser.getAll();

    const user =  new schema.Entity("users", {}, {
        idAttribute : "email"
    });

    const comment = new schema.Entity("mensaje", {
        author : user
    },{
        idAttribute : "_id"
    });

    const finalSchema = [comment]
    const normalizeData = normalize(respuesta.data, finalSchema)
    if(!respuesta.status){
        return res.json({
            data: respuesta.err
        })
    }
    return res.json({
        data: normalizeData
    })
})

rutaApiChat.get("/desnormalizar", async (req,res)=>{
    const respuesta = await chatUser.getAll();

    const user =  new schema.Entity("users", {}, {
        idAttribute : "email"
    });

    const comment = new schema.Entity("mensaje", {
        author : user
    },{
        idAttribute : "_id"
    });

    const finalSchema = [comment]
    const normalizeData = normalize(respuesta.data, finalSchema)
    const denormalizarData = denormalize(normalizeData.result, finalSchema, normalizeData.entities)
    if(!respuesta.status){
        return res.json({
            data: respuesta.err
        })
    }
    return res.json({
        data: denormalizarData
    })
})

module.exports = rutaApiChat;