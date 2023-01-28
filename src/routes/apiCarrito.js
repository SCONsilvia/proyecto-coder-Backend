const { Router } = require("express");
const rutaCarrito = Router();
const ClaseCarrito = require("../contenedorCarrito");
const carrito = new ClaseCarrito("carrito.txt");
const ClaseProductos = require("../controllers/productos");
const producto = new ClaseProductos("productos.txt");

const ControllersCarrito = require("../controllers/carrito");

const contenedorCarrito = new ControllersCarrito();

function validarDatos(req, res, next) {
    const { idProducto, cantidad } = req.body;
    if (!idProducto || !cantidad) {
        console.log(idProducto);
        loggers().error("Campos invalidos");
		return res.status(400).json({
			msg: "Campos invalidos",
		});
	}
    next();
}

rutaCarrito.post("/meter", validarDatos, async (req, res) => {
    console.log(req.body);
    if(!req.session.passport){
        return res.json({
            msj: "tienes que registrarte antes de meter en tu carrito",
        });
    }
    const idUser = req.session.passport.user;
    console.log("usuario");
    console.log(idUser);
    const respuesta = await contenedorCarrito.save(req.body, idUser);
    console.log(respuesta);
    if (respuesta.status) {
        return res.json({
            msj: "El producto se metio en el carrito exitosamente",
            data: respuesta.data,
        });
    }else{
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
        return res.json({
            msj: respuesta.err,
        });
    }
})


rutaCarrito.delete("/", async (req, res) => {
    console.log("deleteada");
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
        return res.json({
            msj: respuesta.err,
        });
    }
});

rutaCarrito.delete("/allCarrito", async (req, res) => {
    console.log("deleteada");
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
        return res.json({
            msj: respuesta.err,
        });
    }
});

module.exports = rutaCarrito;
