const loggers = require("../utils/logs");

const {persistenceCarrito : contenedorCarrito} = require("../persistence/persistence");
const {persistenceUsuarios : contenedorUsuario} = require("../persistence/persistence");

//para envio de email
const { sendGmailCompraFinalizada } = require("../controllers/email");
//para envio de whasapp
const {sendWS, sendWSUser} = require("../controllers/mensajeWhatsApp");

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

const getDataControllers = async (req, res) => {
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
}

const postControllers = async (req, res) => {
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
}

const deleteProductControllers = async (req, res) => {
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
}

const deleteAllCarritoControllers = async (req, res) => {
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
}

const getFinalizarCompraControllers = async (req, res) => {
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
}

module.exports = { getDataControllers, postControllers, deleteProductControllers, deleteAllCarritoControllers, getFinalizarCompraControllers }
