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
            res.render("index", {classActiveHistorial:"buttonActive",classActiveHistorial:"buttonActive", classActiveProductos:"", parcial:"./parciales/mensajeErr.ejs"});
        }else{
            res.render("index", {classActiveHistorial:"buttonActive",  classActiveHistorial:"buttonActive", classActiveProductos:"", parcial:"./parciales/err500.ejs"});
        }
    }
	res.render('index',{listaDeProductos: respuesta.data, classActiveHistorial:"buttonActive", classActiveProductos:"", parcial:"./parciales/historial.ejs"})
})

rutaProductos.get("/", async (req,res)=>{
	res.render("index",{classActiveHistorial:"", classActiveProductos:"buttonActive", parcial:"./parciales/form.ejs"} )
})

rutaProductos.post("/",[validarDatos], async(req,res)=>{
    
    const nuevoId = await contenedor.save(req.body);
    console.log("creacion exitosa el id es:",nuevoId);
    res.redirect('/productos/historial')
})

module.exports = rutaProductos;