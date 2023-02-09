const passport = require("passport");
const { Strategy: LocalStrategy } = require("passport-local");

const {daoUsuarios : controllersUsers} = require("../persistence/daos/factory");

const strategyOptions = {
  usernameField: "email",
  passwordField: "contrasena",
  passReqToCallback: true,
};

const signup = async (req, username, password, done) => {
    console.log("SIGNUP!");
    const data = {
        email: username,
        contrasena: password,
        direccion: req.body.direccion,
        edad: req.body.edad,
        foto: req.body.foto,
        numero: req.body.numero,
        nombre: req.body.nombre,
        admin: req.body.admin,
    };
    const newUser = await controllersUsers.save(data);
    if (newUser.status) {
        return done(null, newUser.data);
    } else {
        if (newUser.err) {
            return done(newUser.err);
        } else {
            return done(null, false, { message: "Usuario existente" });
        }
    }
};

const login = async (req, username, password, done) => {
    console.log("LOGIN!");
    const user = await controllersUsers.buscarUsuarioEmailContrasena(username, password);
    if (user.status) {
        return done(null, user.data);
    } else {
        if (user.err) {
            return done(user.err);
        } else {
            req.info= { message: "no se puede logear con ese user y contrasena" };
            return done(null, false, { message: "no se puede logear con ese user y contrasena" });
        }
    }
};

const loginFunc = new LocalStrategy(strategyOptions, login);
const signUpFunc = new LocalStrategy(strategyOptions, signup);
module.exports = { loginFunc, signUpFunc };

passport.serializeUser((user, done) => {
    console.log("ejecuta serialize");
    done(null, user._id);
});

passport.deserializeUser(async (id, done) => {
    console.log("ejecuta deserialize");
    const user = await controllersUsers.encontrarUnUsuario(id);
    if (user.status) {
        return done(null, user.data);
    } else {
        if (user.err) {
            return done(user.err);
        } else {
            return done(null, false, { message: "" });
        }
    }
});

