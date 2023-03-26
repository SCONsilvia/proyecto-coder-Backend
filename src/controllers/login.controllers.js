// pasport
const passport = require("passport");
//
const { usersRepository } = require("../persistence/repository/users.repository");

//para envio de email
const {sendGmailNewUser} = require("../controllers/email");

const passportOptions = { badRequestMessage: "falta username / password" };

const loggers = require("../utils/logs");

const jwt = require('jsonwebtoken');

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
        console.log(user);
        if(err) {
            res.json({ msg: "un error" });
        }
        if(!user) return res.status(401).json(info);
        enviarCorreoAdministrador(req,res);
        res.json({ msg: "resgistrado con exito" });
    })(req, res);
}

const postIngresoControllers = async (req, res) => {
    
    const token = jwt.sign({exp:Math.floor(Date.now() / 1000) + 60*60*24,id:req.user._id.toString()}, 'mijwtsecreto');
    res.json({
        data:  `bienvenido ${req.user.email}`,
        token: token,
    });
}

const getDataControllers = async (req,res) => {
    console.log("en getdata",req.user)
    if (req.user.email) {
        const dataUser = await usersRepository.getById(req.user._id);
        res.send({
            dataUser: dataUser.data
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
