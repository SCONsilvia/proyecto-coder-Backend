// pasport
const passport = require("passport");
//
const {persistenceUsuarios : user} = require("../persistence/persistence");

//para envio de email
const {sendGmailNewUser} = require("../controllers/email");

const passportOptions = { badRequestMessage: "falta username / password" };

const loggers = require("../utils/logs");

const enviarCorreoAdministrador = async(req, res) => {
    const respuesta = await sendGmailNewUser(req,res)
    if (respuesta.status) {
        loggers().info("correo enviado al administador");
    } else {
        loggers().error(respuesta.err);
    }
}

const postNuevoUserControllers = async (req, res) => {
    passport.authenticate("signup", passportOptions, (err, user, info) => {
        if(err) {
            res.json({ msg: "un error" });
        }
        if(!user) return res.status(401).json(info);
        enviarCorreoAdministrador(req,res);
        res.json({ msg: "resgistrado con exito" });
    })(req, res);
}

const postIngresoControllers = async (req, res) => {
    req.session.email = req.user.email;
    res.json({
        data:  `bienvenido ${req.user.email}`,
    });
}

const getDataControllers = async (req,res) => {
    if (req.session.email) {
        req.session.touch()//renovar la time que sale solo visual   poner en un midderware si querres que se actualice en varias rutas distintas
        res.send({
            session: req.session,
            sessionId: req.sessionID,
            cookies: req.cookies,
        });
    } else {
        res.json({
            data:  `tienes que loguearte con el metodo post en http://localhost:8080/api/login/`,
        });
    }
}

const getLogoutControllers = async (req, res) => {
    const email = req.session.email;
    req.session.destroy((err) => {
        if (!err) res.send(`adios ${email}`);
        else res.send({ status: 'Logout ERROR', body: err });
      });
}

module.exports = { postNuevoUserControllers, postIngresoControllers, getDataControllers, getLogoutControllers }
