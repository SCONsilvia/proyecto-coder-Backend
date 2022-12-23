const {fork} = require("child_process");
const path = require("path");
const {Router} = require("express");
const routerProcess = Router();

routerProcess.get("/info", (req,res) => {
    const respuesta = {
        argumentosDeEntrada : process.execArgv,
        sistemaOperativo : process.platform,
        versionNode : process.version,
        memoriaTotalReservada : JSON.stringify(process.memoryUsage()),
        pathDeEjecucion : process.execPath,
        processId : process.pid,
        carpetaDelProyecto : process.cwd(),
    };
    return res.json({
        data: respuesta
    })
})

const scriptPath = path.resolve(__dirname, "../utils/fork");



routerProcess.get("/randoms", (req,res) => {
    let cantidad = req.query.cant;
    if(!cantidad){
        cantidad = 100000000
    }
    const computo = fork(scriptPath, [cantidad]);
    computo.send(cantidad);
    computo.on("message", (resul) => {
      res.json({
        resultado: resul,
      });
    });
})

module.exports = routerProcess;