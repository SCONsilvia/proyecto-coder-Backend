const { fork } = require("child_process");
const path = require("path");
const { Router } = require("express");

const routerProcess = Router();

const yargs = require("yargs/yargs");
const { hideBin } = require("yargs/helpers");
const argv = yargs(hideBin(process.argv)).argv;

routerProcess.get("/info", (req, res) => {
    const a = process.pid
    console.log(`Start calculo, PID: ${process.pid}`);
    const respuesta = {
        argumentosDeEntrada: process.argv,
        sistemaOperativo: process.platform,
        versionNode: process.version,
        memoriaTotalReservada: JSON.stringify(process.memoryUsage()),
        pathDeEjecucion: process.execPath,
        processId: process.pid,
        carpetaDelProyecto: process.cwd(),
    };
    return res.json({
        pid: process.pid,
        a: `${a}`,
        ruta: req.baseUrl + req.path,
        msg: `HOLA desde puerto ${argv.port}`,
        data: respuesta,
    });
});

routerProcess.get("/slow", (req, res) => {
    let sum = 0;
    for (let i = 0; i < 15006500445; i++) {
      sum += i;
    }
    return res.json({
        pid: process.pid,
        ruta: req.baseUrl + req.path,
        msg: `HOLA desde puerto ${argv.port}`
    });
});

const scriptPath = path.resolve(__dirname, "../utils/fork");

routerProcess.get("/randoms", (req, res) => {
    console.log(`Start calcusssslo, PID: ${process.pid}`);
    let cantidad = req.query.cant;
    if (!cantidad) {
        cantidad = 100000000;
    }
    const computo = fork(scriptPath, [cantidad]);
    computo.send(cantidad);
    computo.on("message", (resul) => {
      res.json({
        processId: process.pid,
        resultado: resul,
      });
    });
});

module.exports = routerProcess;
