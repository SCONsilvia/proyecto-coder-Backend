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
            res.render('components/mensajeErr', {classActiveHistorial:"buttonActive"});
        }else{
            res.render("components/err500", {classActiveHistorial:"buttonActive"});
        }
    }
	res.render('components/historial',{listaDeProductos: respuesta.data, classActiveHistorial:"buttonActive"})
})

rutaProductos.get("/", async (req,res)=>{
	res.render('components/form',{classActiveProductos:"buttonActive"} )
})

rutaProductos.post("/",[validarDatos], async(req,res)=>{
    
    const nuevoId = await contenedor.save(req.body);
    console.log("creacion exitosa el id es:",nuevoId);
    res.redirect('/productos/historial')
})

module.exports = rutaProductos;