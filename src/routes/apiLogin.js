const {Router} = require("express");
const login = Router();
let ControllersUsers;
//para que funcione el glich
if (process.env.MODE == "desarrollo") {
    ControllersUsers = require("../controllers/users");
}else{
    //ControllersUsers = require("");
}

const contenedor = new ControllersUsers();

function validarDatos(req, res, next){
    const {email, contrasena} = req.body;
    if(!email || !contrasena) {
		return res.status(400).json({
			msg: "Campos invalidos "
		})
	}
    next();
}

login.post("/nuevo", validarDatos, async (req,res) => {
    const respuesta = await contenedor.save(req.body);
    if(!respuesta.status){
        return res.json({
            data: respuesta.err
        })
    }
    return res.json({
        msg: respuesta.data
    })

})

login.post("/",validarDatos, async (req,res) => {

    const respuesta = await contenedor.buscarUsuarioEmailContrasena(req.body);

    if(!respuesta.status)
      res.status(401).json({ msg: respuesta.err });
    else {
        req.session.email = respuesta.data[0].email
        res.json({
            data:  `bienvenido ${respuesta.data[0].email}`
        })
    }
})

login.get("/", (req,res) => {
    if (req.session.email) {
        res.send({
            session: req.session,
            sessionId: req.sessionID,
            cookies: req.cookies,
        })
    }else{
        res.json({
            data:  `tienes que loguearte con el metodo post en http://localhost:8080/api/login/`
        })
    }
})

login.get("/logout", (req,res) => {
    const email = req.session.email;
    req.session.destroy((err) => {
        if (!err) res.send(`adios ${email}`);
        else res.send({ status: 'Logout ERROR', body: err });
      });
})


module.exports = login;