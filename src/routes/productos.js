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

rutaProductos.get("/", async (req,res)=>{
    const respuesta = await contenedor.GetAll();
    if(!respuesta.respuesta){
        return res.status(404).json({
            error: `${respuesta.error}`
        })
    }
    return res.json({
        data: respuesta.data
    })
})

rutaProductos.get("/:id", async (req,res)=>{
    const id = req.params.id;
    const todosLosProductos = await contenedor.getAll();
    const indice = todosLosProductos.findIndex(e => e.id == id);
    
    if(indice < 0){
        return res.status(404).json({
            error: "Producto no encontrado"
        })
    }

    res.json(todosLosProductos[indice]);
})

rutaProductos.post("/", validarDatos, async(req,res)=>{
    const nuevoId = await contenedor.save(req.body);

    return res.json({
        msg: `el producto se a creado existosamente su id es: ${nuevoId}`
    })
})

rutaProductos.put("/:id", validarDatos, async(req,res)=>{
    const id = req.params.id;

    const existosoONoExistoso = await contenedor.actualizarPorId(id, req.body);

    if(existosoONoExistoso.respuesta === false){
        return res.json({
            msg: `${existosoONoExistoso.error}`
        })
    }

    return res.json({
        msg: `Elemento actualizado exitosamente`
    })
})

rutaProductos.delete("/:id", async(req,res)=>{
    const id = req.params.id;
    const existosoONoExistoso = await contenedor.deleteById(id);

    if(existosoONoExistoso.respuesta === false){
        return res.json({
            msg: `${existosoONoExistoso.error}`
        })
    }

    return res.json({
        msg: `Elemento eliminado exitosamente`
    })
})

module.exports = rutaProductos;