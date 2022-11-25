
const {app} = require("./src/services/server")
const {initWsServer} = require("./src/services/socket")
const {initMongoDB} = require("./src/db/database")

const puerto = process.env.PORT || 8080;
const myHTTPServer = initWsServer(app)

const server = myHTTPServer.listen(puerto, async ()=>{
    await initMongoDB();
    console.log(`Servidor http escuchando en el puerto ${server.address().port}`);
})

server.on("error",(error) => console.log(`error en el servidos ${error}`))

