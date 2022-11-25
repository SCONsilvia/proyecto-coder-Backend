const rutaPrincipal = require("../routes/index");
const express = require("express");

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//cors para que me funcione el api en react y no me tire un error
const cors = require('cors');
app.use(cors());

app.use("/", rutaPrincipal)
module.exports = {app};