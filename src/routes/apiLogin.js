const { Router } = require("express");

const login = Router();
// pasport
const passport = require("passport");
//

const passportOptions = { badRequestMessage: "falta username / password" };

//para envio de email
const {sendGmailNewUser} = require("../controllers/email")

function validarDatos(req, res, next) {
    console.log("here");
    const { email, contrasena, nombre, direccion, edad, numero, foto } = req.body;
    if (!email || !contrasena || !nombre || !direccion || !edad || !numero || !foto) {
		return res.status(400).json({
			msg: "Campos invalidos ",
		});
	}
    if(isNaN(numero) || isNaN(edad)){
        return res.status(400).json({
            msg: "Unos de los campos no es un numero",
        });
    }
    next();
}

function validarDatosIngreso(req, res, next) {
    const { email, contrasena } = req.body;
    if (!email || !contrasena ){
		return res.status(400).json({
			msg: "Campos invalidos ",
		});
	};
    next();
}

const enviarCorreoAdministrador = async(req, res) => {
    const respuesta = await sendGmailNewUser(req,res)
    if (respuesta.status) {
        console.log("correo enviado al administador");
    } else {
        console.log(respuesta.err);
    }
}

login.post("/nuevo", validarDatos, (req, res) => {
    passport.authenticate("signup", passportOptions, (err, user, info) => {
        if(err) {
            res.json({ msg: "un error" });
        }
        if(!user) return res.status(401).json(info);
        enviarCorreoAdministrador(req,res);
        res.json({ msg: "resgistrado con exito" });
    })(req, res);
});

login.post("/", validarDatosIngreso, passport.authenticate("login", passportOptions), async (req, res) => {
    req.session.email = req.user.email;
    res.json({
        data:  `bienvenido ${req.user.email}`,
    });
});


const isLoggedIn = (req, res, next) => {
    console.log(req.isAuthenticated());
    if (!req.isAuthenticated()) return res.status(401).json({ msg: "tienes que loguearte con el metodo post en http://localhost:8080/api/login/" });
    next();
}
  



login.get("/",isLoggedIn, (req,res) => {
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
});

login.get("/logout", isLoggedIn, (req, res) => {
    const email = req.session.email;
    req.session.destroy((err) => {
        if (!err) res.send(`adios ${email}`);
        else res.send({ status: 'Logout ERROR', body: err });
      });
});

/* login.post("/enviarCorreo", sendGmail);

login.post("/enviarCorreo2", async (req,res) => {
    const respuesta = await sendGmail(req,res)
    if (respuesta.status) {
        res.json({
            data: "Correo enviado",
        });
    } else {
        res.json({
            data:  respuesta.err,
        });
    }
}); */

module.exports = login;
