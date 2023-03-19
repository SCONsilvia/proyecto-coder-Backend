// webSocket
const webSocket = require("socket.io");
const http = require("http");

const {productsRepository : contenedor} = require("../persistence/repository/products.repository");
const {chatRepository : chatUsuarios} = require("../persistence/repository/chat.repository");

let myHTTPServer;

const initWsServer = (app) => {
    myHTTPServer = http.Server(app);
    const myWebSocketServer = webSocket(myHTTPServer);

    myWebSocketServer.on("connection", (socket) => {
        //console.log("cliente conectado");

        socket.on("envioDeDatosDeUnNuevoProducto", async (dataRecibida) => {
            const nuevoId = await contenedor.save(dataRecibida);
            dataRecibida.id = nuevoId.data;
            console.log("creacion exitosa el id es:", nuevoId.data);

            myWebSocketServer.emit("agregarNuevoProductoYQueSeVeaParaTodosLosUsuario", dataRecibida);
        });

        socket.on("envioDeDatosDelChat", (data) => {
            console.log("llega al socket",data)
            chatUsuarios.save(data.user.id, {mensaje:data.mensaje});
            //data.user= {email: data.email}
            //data.fecha= new Date();
            socket.emit("agregarNuevoChatUser", data);
            socket.broadcast.emit("agregarNuevoChat", data);
        });
    });
    return myHTTPServer;
};

module.exports = {
    initWsServer,
};

// fin de websocket
