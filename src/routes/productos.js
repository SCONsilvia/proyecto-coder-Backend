const contenedorClase = require("../contenedor");
const contenedor = new contenedorClase("productos.txt");
const ContenedorDeChat = require("../contenedorDeChat")
const chatUser = new ContenedorDeChat("chat.txt");

const {Router} = require("express");
const rutaProductos = Router();

/* function validarDatos(req, res, next){
    const {title, price, thumbnail} = req.body;
    if(!title || !price || !thumbnail) {
		return res.status(400).json({
			msg: "Campos invalidos "
		})
	}
    next();
} */

rutaProductos.get("/historial", async (req,res)=>{
    const respuesta = await contenedor.GetAll();
    if(!respuesta.respuesta){
        if (respuesta.tipo == -1) {
            res.render('partials/mensajeErr');
        }else{
            res.render("partials/err500");
        }
    }
	res.render('historial',{listaDeProductos: respuesta.data, classActiveHistorial:"buttonActive", layout: 'index'})
})

rutaProductos.get("/", async (req,res)=>{
    const respuesta = await contenedor.GetAll();
    const respuestaDelChat = chatUser.getAll();
    if(!respuesta.respuesta){
        if (respuesta.tipo == -1) {
            res.render('form',{classActiveProductos:"buttonActive",msjErr: 'mensajeErr'});
        }else{
            res.render('form',{classActiveProductos:"buttonActive",err500: "err500"});
        }
    }else{
        res.render('form',{classActiveProductos:"buttonActive",listaDeProductos: respuesta.data, layout: 'index', historialDelChat : respuestaDelChat} )
    }
	
})

/* rutaProductos.post("/",[validarDatos], async(req,res)=>{
    
    const nuevoId = await contenedor.save(req.body);
    console.log("creacion exitosa el id es:",nuevoId);
    res.redirect('/productos/historial')
}) */

module.exports = {rutaProductos, contenedor};