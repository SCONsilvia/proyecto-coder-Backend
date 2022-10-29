const path = require("path");
const {engine} = require("express-handlebars");
const rutaPrincipal = require("../routes/index");
const express = require("express");
const webSocket = require("socket.io");
const http = require("http");
const moment = require("moment");

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//configurando handlebars
app.use(express.static('public'));

const direccionDeCarpetaView = path.resolve(__dirname, '../../views');
const direccionDeCarpetaLayout = `${direccionDeCarpetaView}/layouts`
const direccionDeCarpetaPartial = `${direccionDeCarpetaView}/partials`
const direcionDeLayoutPorDefecto = `${direccionDeCarpetaView}/layouts/index.hbs`;

app.set("view engine", "hbs");
app.set("views", direccionDeCarpetaView)

app.engine("hbs", engine({
    extname:"hbs",
    defaultLayout: direcionDeLayoutPorDefecto,
    layoutsDir: direccionDeCarpetaLayout,
	partialsDir: direccionDeCarpetaPartial,
}));

//fin de configurando handlebars

//webSocket
const myHTTPServer = http.Server(app);

const myWebSocketServer = webSocket(myHTTPServer);
const contenedorClase = require("../contenedor");
const ContenedorDeChat = require("../contenedorDeChat");

const contenedor = new contenedorClase("productos.txt");
const chatUsuarios = new ContenedorDeChat("chat.txt");

myWebSocketServer.on("connection",(socket)=>{
    console.log("cliente conectado")

    socket.on("envioDeDatosDeUnNuevoProducto", async (dataRecibida)=>{
        console.log("recibido",dataRecibida);
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
//fin de websocket


app.use("/", rutaPrincipal)
module.exports = {myHTTPServer};