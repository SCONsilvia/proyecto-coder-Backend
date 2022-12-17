const rutaPrincipal = require("../routes/index");
const express = require("express");

//session
const MongoStore = require("connect-mongo");
const cookieParser = require("cookie-parser");
const session = require("express-session");
const ttlSeconds = 60 * 5; //segundos poner 10 es 10 segundos

const StoreOptions = {
    store : MongoStore.create({
        mongoUrl : process.env.MONGO_ATLAS,/* 
        crypto : {
            secret : "1234"
        }, */
    }),
    secret: "claveCualquiera",
    resave : false,
    saveUninitialized : false,
    rolling: true,//no se para que sirve pero me resetea el tiempo de la cookie al actualizar la pagina
    maxAge : ttlSeconds * 1000,
    cookie : {
        maxAge : ttlSeconds * 1000
    }
}
//finsesion
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//cors para que me funcione el api en react y no me tire un error
const cors = require('cors');
app.use(cors({ origin: ["http://localhost:3000"], credentials:true}));

//sesion
app.use(cookieParser());
app.use(session(StoreOptions));
//finsesion

app.use("/", rutaPrincipal)
module.exports = {app};