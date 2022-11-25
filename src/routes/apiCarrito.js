const {Router} = require("express");
const rutaCarrito = Router();
const ClaseCarrito = require("../contenedorCarrito");
const carrito = new ClaseCarrito("carrito.txt");
const ClaseProductos = require("../controllers/productos");
const producto = new ClaseProductos("productos.txt");

function errores(tipoDeError){
    if(tipoDeError == -1){
        return `No se encontro ese id de carrito`
    }else if(tipoDeError == -2){
        return "No se encuentra el producto en el carrito"
    }else{
        return tipoDeError.message;
    }
}

function validarDatos(req, res, next){
    const {id} = req.body;
    if(!id) {
		return res.status(400).json({
			msg: "Campos invalidos "
		})
	}
    next();
}

rutaCarrito.post("/", (req, res)=>{
    const respuesta = carrito.crearCarrito();
    if(respuesta.status){
        return res.json({
            msj : `Creacion de carrito existosa`,
            id: respuesta.data
        })
    }else{
        return res.json({
            msj : errores(respuesta.err)
        })
    }
})

rutaCarrito.delete("/:id", (req, res)=>{
    const id = req.params.id;
    const respuesta = carrito.delete(id);

    if(respuesta.status){
        return res.json({
            msj : `Borrado de carrito existosa`
        })
    }else{
        return res.json({
            msj : errores(respuesta.err)
        })
    }
})

rutaCarrito.post("/:id/productos",validarDatos, async (req, res)=>{
    const id = req.params.id;
    respuestaProducto = await producto.getById(req.body.id);
    if(respuestaProducto == null){
        return res.json({
            msj : "Ese producto no existe"
        })
    }else{
        respuesta = carrito.save(respuestaProducto, id)

        if(respuesta.status){
            return res.json({
                msj : "Guardado existoso"
            })
        }else{
            return res.json({
                msj : errores(respuesta.err)
            })
        }
    }
})

rutaCarrito.delete("/:id/productos/:id_prod", (req, res)=>{
    const id = req.params.id;
    const idProducto = req.params.id_prod;

    const respuesta = carrito.deleteForId(id, idProducto);

    if(respuesta.status){
        return res.json({
            msj : `Borrado de producto en el carrito existosa`
        })
    }else{
        return res.json({
            msj : errores(respuesta.err)
        })
    }
})

rutaCarrito.get("/:id/productos", (req, res)=>{
    const id = req.params.id;
    const respuesta = carrito.getCarritoForId(id);

    if(respuesta.status){
        return res.json({
            data : respuesta.data
        })
    }else{
        return res.json({
            msj : errores(respuesta.err)
        })
    }
})

module.exports = rutaCarrito;