// pasport
const passport = require("passport");

const { usersRepository } = require("../persistence/repository/users.repository");

//para envio de email
const {sendGmailNewUser} = require("../controllers/email");

const passportOptions = { badRequestMessage: "falta username / password" };

const loggers = require("../utils/logs");

const isLoggedIn = (req, next) => {
    console.log(req.isAuthenticated());
    if (!req.isAuthenticated()) return "tienes que loguearte con el metodo post en http://localhost:8080/api/login/";
    next();
}

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

const postIngresoControllers = async (argv, req ,res) => {
    passport.authenticate("login", passportOptions)(req,res)
    //console.log(argv)
    //console.log(req)
    req.session.email = argv.data.email;
    return `bienvenido ${argv.data.email}`

}

const getDataControllers = async (args,req) => {
    console.log("argumentos" + req.session.email);
    if (req.session.email) {
        req.session.touch()//renovar la time que sale solo visual   poner en un midderware si querres que se actualice en varias rutas distintas
        console.log(req.session)
        const dataUser = await usersRepository.getById(req.session.passport.user);
        console.log(`
        ${req.session}, ${req.sessionID}, ${req.cookies}, ${dataUser.data}
        `)
        return dataUser.data

    } else {
        return `tienes que loguearte con el metodo post en http://localhost:8080/api/login/`
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