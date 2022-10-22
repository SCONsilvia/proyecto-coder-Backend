const path = require("path");


const rutaPrincipal = require("../routes/index");

const express = require("express");
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));



//configurando Pug
app.use(express.static('public'));

const direccionDeCarpetaView = path.resolve(__dirname, '../../views');

app.set("view engine", "pug");
app.set("views", direccionDeCarpetaView);

//fin de configurando Pug





app.use("/", rutaPrincipal)

module.exports = {app};