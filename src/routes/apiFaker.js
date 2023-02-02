const { Router } = require("express");
const productosTest = Router();

const { getDatosAleatoriosControllers } = require("../controllers/faker.controllers");

productosTest.get("/", getDatosAleatoriosControllers);

module.exports = productosTest;
