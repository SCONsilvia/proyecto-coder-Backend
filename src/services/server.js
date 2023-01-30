const rutaPrincipal = require("../routes/index");
const express = require("express");

// passport local
const passport = require("passport");

const { loginFunc, signUpFunc } = require("./auth.js");

// session
const MongoStore = require("connect-mongo");
const cookieParser = require("cookie-parser");
const session = require("express-session");
const ttlSeconds = 60 * 3; // segundos poner 10 es 10 segundos

const StoreOptions = {
    store: MongoStore.create({
        mongoUrl: process.env.MONGO_ATLAS,
        /*
        crypto : {
            secret : "1234"
        }, */
    }),
    secret: "claveCualquiera",
    resave: false,
    saveUninitialized: false,
    rolling: true, // no se para que sirve pero me resetea el tiempo de la cookie al actualizar la pagina
    maxAge: ttlSeconds * 1000,
    cookie: {
        maxAge: ttlSeconds * 1000,
    },
};
// finsesion
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// cors para que me funcione el api en react y no me tire un error
const cors = require("cors");

app.use(cors({ origin: ["http://localhost:3000"], credentials: true }));

// sesion
app.use(cookieParser());
app.use(session(StoreOptions));
// finsesion

// passport local
app.use(passport.initialize());
app.use(passport.session());
passport.use("login", loginFunc);
passport.use("signup", signUpFunc);
//

//para que la compresion sea siempre
const compression = require("compression");
app.use(compression());

const loggers = require("../utils/logs");

const middlewareDeRutas = (req, res, next) => {
    loggers().info(`Ruta ${req.baseUrl + req.path} metodo ${req.method}`);
    next();
}

app.use("/", middlewareDeRutas, rutaPrincipal);
module.exports = { app };
