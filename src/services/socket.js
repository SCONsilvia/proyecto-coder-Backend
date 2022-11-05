//webSocket
const webSocket = require("socket.io");
const http = require("http");
const moment = require("moment");

const contenedorClase = require("../contenedor");
const ContenedorDeChat = require("../contenedorDeChat");
const contenedor = new contenedorClase("productos.txt");
const chatUsuarios = new ContenedorDeChat("chat.txt");

const contenedorClase2 = require("../contenedorCarrito");

let myHTTPServer;

const initWsServer = (app) => {
    myHTTPServer = http.Server(app);
    const myWebSocketServer = webSocket(myHTTPServer);

    myWebSocketServer.on("connection",(socket)=>{
        console.log("cliente conectado")
    
        socket.on("envioDeDatosDeUnNuevoProducto", async (dataRecibida)=>{
            const nuevoId = await contenedor.save(dataRecibida);
            console.log("creacion exitosa el id es:",nuevoId);
            
            myWebSocketServer.emit("agregarNuevoProductoYQueSeVeaParaTodosLosUsuario", dataRecibida)
        })
    
        socket.on("envioDeDatosDelChat", (data)=>{
            data.fecha = moment().format('Do MMMM YYYY, h:mm:ss a')
            chatUsuarios.save(data);
            socket.emit("agregarNuevoChatUser", data);
            socket.broadcast.emit("agregarNuevoChat", data);
        })
    })
    return myHTTPServer
}


module.exports = {
    initWsServer
};



//fin de websocket