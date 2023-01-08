const { faker } = require("@faker-js/faker");
const { Router } = require("express");
const productosTest = Router();

faker.locale = "es";

const datosAleatorios = () => {
    const respuesta = [];

    for(let i = 0; i < 5; i+= 1) {
        respuesta.push({
            nombre: faker.commerce.productName(),
            imagen: faker.image.abstract(),
            precio: faker.datatype.number({ max: 10001 }),
        });
    }

    return { data: respuesta, status: true, err: null };
};

const yargs = require("yargs/yargs");
const { hideBin } = require("yargs/helpers");
const argv = yargs(hideBin(process.argv)).argv;

productosTest.get("/", (req, res) => {
    const respuesta = datosAleatorios();
    return res.json({
        msg: `HOLA desde puerto ${argv.port}`,
        data: respuesta.data,
    });
});

module.exports = productosTest;
