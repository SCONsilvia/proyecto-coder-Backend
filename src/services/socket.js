//webSocket
const webSocket = require("socket.io");
const http = require("http");

let ControllersChat;
let ControllersProductos
//para que funcione el glich
if (process.env.MODE == "desarrollo") {
    ControllersChat = require("../controllers/chat");
    ControllersProductos = require("../controllers/productos");
}else{
    ControllersChat = require("../contenedorDeChat");
    ControllersProductos = require("../contenedor");
}
const contenedor = new ControllersProductos();
const chatUsuarios = new ControllersChat();

let myHTTPServer;

const initWsServer = (app) => {
    myHTTPServer = http.Server(app);
    const myWebSocketServer = webSocket(myHTTPServer);

    myWebSocketServer.on("connection",(socket)=>{
        console.log("cliente conectado")
    
        socket.on("envioDeDatosDeUnNuevoProducto", async (dataRecibida)=>{
            const nuevoId = await contenedor.save(dataRecibida);
            dataRecibida.id = nuevoId.data;
            console.log("creacion exitosa el id es:",nuevoId.data);
            
            myWebSocketServer.emit("agregarNuevoProductoYQueSeVeaParaTodosLosUsuario", dataRecibida)
        })
    
        socket.on("envioDeDatosDelChat", (data)=>{
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