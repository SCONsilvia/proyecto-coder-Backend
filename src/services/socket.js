//webSocket
const webSocket = require("socket.io");
const http = require("http");

const ControllersProductos = require("../controllers/productos");
const ControllersChat = require("../controllers/chat");
const contenedor = new ControllersProductos("productos.txt");
const chatUsuarios = new ControllersChat("chat.txt");

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