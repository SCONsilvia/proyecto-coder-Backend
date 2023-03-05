const { Router } = require("express");

const login = Router();

const { postNuevoUserControllers, postIngresoControllers, getDataControllers, getLogoutControllers } = require("../controllers/login.controllers");
const passport = require("passport");
const passportOptions = { badRequestMessage: "falta username / password" };


function validarDatos(req, res, next) {
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

const isLoggedIn = (req, res, next) => {
    if (!req.isAuthenticated()) return res.status(401).json({ msg: "tienes que loguearte con el metodo post en http://localhost:8080/api/login/" });
    next();
}

login.post("/nuevo", validarDatos, postNuevoUserControllers);

login.post("/", validarDatosIngreso, passport.authenticate("login", passportOptions), postIngresoControllers);
  
login.get("/",isLoggedIn, getDataControllers);

login.get("/logout", isLoggedIn, getLogoutControllers);

module.exports = login;
