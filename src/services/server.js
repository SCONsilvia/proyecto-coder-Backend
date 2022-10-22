const path = require("path");
const {engine} = require("express-handlebars");


const rutaPrincipal = require("../routes/index");

const express = require("express");
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));



//configurando handlebars
app.use(express.static('public'));

const direccionDeCarpetaView = path.resolve(__dirname, '../../views');
const direccionDeCarpetaLayout = `${direccionDeCarpetaView}/layouts`
const direccionDeCarpetaPartial = `${direccionDeCarpetaView}/partial`
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





app.use("/", rutaPrincipal)

module.exports = {app};