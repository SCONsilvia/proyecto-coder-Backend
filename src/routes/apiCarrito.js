const { Router } = require("express");
const rutaCarrito = Router();

const loggers = require("../utils/logs");

const ControllersCarrito = require("../controllers/carrito");
const ControllersUsers = require("../controllers/users");

const contenedorCarrito = new ControllersCarrito();
const contenedorUsuario = new ControllersUsers();

//para envio de email
const { sendGmailCompraFinalizada } = require("../controllers/email");
//para envio de whasapp
const {sendWS, sendWSUser} = require("../controllers/mensajeWhatsApp");

function validarDatos(req, res, next) {
    const { idProducto, cantidad } = req.body;
    if (!idProducto || !cantidad) {
        loggers().error("Campos invalidos");
		return res.status(400).json({
			msg: "Campos invalidos",
		});
	}
    next();
}

rutaCarrito.post("/", validarDatos, async (req, res) => {
    if(!req.session.passport){
        return res.json({
            msj: "tienes que registrarte antes de meter en tu carrito",
        });
    }
    const idUser = req.session.passport.user;
    const respuesta = await contenedorCarrito.save(req.body, idUser);
    if (respuesta.status) {
        return res.json({
            msj: "El producto se metio en el carrito exitosamente",
            data: respuesta.data,
        });
    }else{
        loggers().error(respuesta.err)
        return res.json({
            msj: respuesta.err,
        });
    }
});

rutaCarrito.get("/", async (req, res) => {
    if(!req.session.passport){
        return res.json({
            msj: "tienes que registrarte antes de ver su carrito",
        });
    }
    const idUser = req.session.passport.user;
    const respuesta = await contenedorCarrito.getById(idUser);

    if(respuesta.status){
        return res.json({
            data: respuesta.data,
        });
    }else{
        loggers().error(respuesta.err);
        return res.json({
            msj: respuesta.err,
        });
    }
})

rutaCarrito.delete("/", async (req, res) => {
    if(!req.session.passport){
        return res.json({
            msj: "tienes que registrarte antes de borrar en tu carrito",
        });
    }
    const idProducto = req.body.idProducto;
    const idUser = req.session.passport.user;
    const respuesta = await contenedorCarrito.deleteProductById(idProducto, idUser);

    if(respuesta.status){
        return res.json({
            msj: "Borrado de carrito existosa",
        });
    }else{
        loggers().error(respuesta.err);
        return res.json({
            msj: respuesta.err,
        });
    }
});

rutaCarrito.delete("/allCarrito", async (req, res) => {
    if(!req.session.passport){
        return res.json({
            msj: "tienes que registrarte antes de borrar todo tu carrito",
        });
    }
    const idUser = req.session.passport.user;
    const respuesta = await contenedorCarrito.deleteTodoElCarritoById(idUser);

    if(respuesta.status){
        return res.json({
            msj: "Borrado de carrito existosa",
        });
    }else{
        loggers().error(respuesta.err)
        return res.json({
            msj: respuesta.err,
        });
    }
});

const enviarCorreoAdministrador = async(usuario, productos) => {
    const respuesta = await sendGmailCompraFinalizada(usuario.data, productos)
    if (respuesta.status) {
        loggers().info("correo enviado al administador");
    } else {
        loggers().error(respuesta.err);
    }
}

const enviarMensajeAdministrador = async(usuario, productos) => {
    const mensajeAdmin = `Nuevo pedido de ${usuario.data.nombre} ${usuario.data.email} sus productos son ${JSON.stringify(productos)}`
    const envioDeAdmin = await sendWS(mensajeAdmin);
    if (envioDeAdmin.status) {
        loggers().info("mensajes a admin enviado");
    } else {
        loggers().error(envioDeAdmin.err);
    }
}

const enviarMensajeUser = async(usuario) => {
    const mensajeUser = `Su pedido a sido recibido y se esta procesando`
    const envioDeUser = await sendWSUser(mensajeUser, usuario.data.numero)
    if (envioDeUser.status) {
        loggers().info("mensajes a user enviado");
    } else {
        loggers().error(envioDeUser.err);
    }
}

rutaCarrito.get("/finalizarCompra", async (req, res) => {
    if(!req.session.passport){
        return res.json({
            msj: "tienes que registrarte antes de finalizar la compra",
        });
    }
    const idUser = req.session.passport.user;  
    const respuesta = await contenedorCarrito.finalizarCompra(idUser);
    if (respuesta.status) {
        const usuario = await contenedorUsuario.encontrarUnUsuario(idUser);
        enviarCorreoAdministrador(usuario, respuesta.data);
        enviarMensajeAdministrador(usuario, respuesta.data);
        enviarMensajeUser(usuario);
        const borrandoCarrito = await contenedorCarrito.deleteTodoElCarritoById(idUser);
        return res.json({
            msj: "Compra finalizada con exito",
            carrito: respuesta.data,
        });
    }else{
        loggers().error(respuesta.err);
        return res.json({
            msj: respuesta.err,
        });
    }
});

module.exports = rutaCarrito;
