require("dotenv").config();
const { app } = require("./src/services/server");
const { initWsServer } = require("./src/services/socket");
const { initMongoDB } = require("./src/persistence/daos/mongodb/db/database");

const yargs = require("yargs/yargs");
const { hideBin } = require("yargs/helpers");
const argv = yargs(hideBin(process.argv)).argv;

const puerto = process.env.PORT || 8080;

const cluster = require("cluster");
const os = require("os");

const inicializarBaseDeDatos = (argv) =>{
    switch (argv) {
        case 'mongo':
            initMongoDB();
            break;
        default:
            initMongoDB();
            break;
    };
}

const nucleos = os.cpus().length;
if(argv.modo == "cluster" && cluster.isPrimary){
    console.log(`Cantidad de nucleos ${nucleos}`);
    console.log(`PID master ${process.pid}`);
    for (let i = 0; i < nucleos; i += 1) {
        cluster.fork()
    }
    cluster.on('exit', (worker, code) => {
        console.log(`Worker ${worker.process.pid} with code ${code}`);
        cluster.fork();
    })
    
}else{
    inicializarBaseDeDatos(process.argv[2]);
    const myHTTPServer = initWsServer(app);
        const server = myHTTPServer.listen(puerto, async () => {
            console.log(`Servidor http escuchando en el puerto ${server.address().port} en nucleo ${process.pid}`);
        });

    server.on("error", (error) => console.log(`error en el servidos ${error}`));

    module.exports = { server }; //para que funcione productrs.test.js
}
