const contenedorClase = require("../contenedor");
const contenedor = new contenedorClase("productos.txt");

const {Router} = require("express");
const rutaProductos = Router();

function validarDatos(req, res, next){
    const {title, price, thumbnail} = req.body;
    if(!title || !price || !thumbnail) {
		return res.status(400).json({
			msg: "Campos invalidos "
		})
	}
    next();
}

rutaProductos.get("/historial", async (req,res)=>{
    const respuesta = await contenedor.GetAll();
    if(!respuesta.respuesta){
        if (respuesta.tipo == -1) {
            res.render('mensajeErr');
        }else{
            res.render("err500");
        }
    }
	res.render('historial',{listaDeProductos: respuesta.data, classActiveHistorial:"buttonActive", layout: 'index'})
})

rutaProductos.get("/", async (req,res)=>{
	res.render('form',{classActiveProductos:"buttonActive"} )
})

rutaProductos.post("/",[validarDatos], async(req,res)=>{
    
    const nuevoId = await contenedor.save(req.body);
    console.log("creacion exitosa el id es:",nuevoId);
    res.redirect('/productos/historial')
})

module.exports = rutaProductos;