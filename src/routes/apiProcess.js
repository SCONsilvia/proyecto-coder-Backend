const { Router } = require("express");

const routerProcess = Router();

const { getDataControllers, getSlowIdControllers, getRandomsControllers } = require("../controllers/process.controllers");

routerProcess.get("/info", getDataControllers);

routerProcess.get("/slow", getSlowIdControllers);

routerProcess.get("/randoms", getRandomsControllers);

module.exports = routerProcess;
