
require("dotenv").config();
const {app} = require("./src/services/server")
const {initWsServer} = require("./src/services/socket")


const yargs = require('yargs/yargs')
const { hideBin } = require('yargs/helpers')
const argv = yargs(hideBin(process.argv)).argv

const puerto = argv.port || 8080;
const myHTTPServer = initWsServer(app)

const server = myHTTPServer.listen(puerto, async ()=>{
    const {initMongoDB} = require("./src/db/database")
    await initMongoDB();
    console.log(`Servidor http escuchando en el puerto ${server.address().port}`);
})

server.on("error",(error) => console.log(`error en el servidos ${error}`))

