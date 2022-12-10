const {Router} = require("express");
const login = Router();

const users = [
    {
      nombre: 'maria',
      edad: "80",
      admin: true,
    },
    {
      nombre: 'jose',
      edad : 40,
      admin: false,
    }
]

login.post("/", (req,res) => {
    const { nombre } = req.body;

    const index = users.findIndex((e) => e.nombre === nombre);
  
    if(index < 0)
      res.status(401).json({ msg: 'error al iniciar' });
    else {
        req.session.nombre = nombre
        res.json({
            data:  `bienvenido ${nombre}`
        })
    }
})

login.get("/", (req,res) => {
    req.session.visitas = req.session.visitas? ++req.session.visitas : 1
    res.send({
        session: req.session,
        sessionId: req.sessionID,
        cookies: req.cookies,
    })
})

login.get("/logout", (req,res) => {
    const nombre = req.session.nombre;
    req.session.destroy((err) => {
        if (!err) res.send(`adios ${nombre}`);
        else res.send({ status: 'Logout ERROR', body: err });
      });
})


module.exports = login;