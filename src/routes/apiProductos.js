const config = require("../config/index");
const contenedorClase = require("../contenedor");
const contenedor = new contenedorClase("productos.txt");

const {Router} = require("express");
const rutaApiProductos = Router();

function validarDatos(req, res, next){
    const {nombre, descripcion, codigo, foto, precio, stock} = req.body;
    if(!nombre || !descripcion || !codigo || !foto || !precio || !stock) {
		return res.status(400).json({
			msg: "Campos invalidos "
		})
	}
    next();
}

function administrador(req, res, next){
    console.log(config);
    if(!config.administrador){
        return res.status(401).json({
            metodo: req.method,
            ruta: req.baseUrl+ req.path,
            err : "No tienes las autorizacion requeridad"
        })
    }
    next();
}

rutaApiProductos.get("/", async (req,res)=>{
    const respuesta = await contenedor.GetAll();
    if(!respuesta.respuesta){
        if (respuesta.tipo == -1) {
            return res.status(404).json({
                error: `${respuesta.error}`
            })
        }else{
            return res.status(500).json({
                error: `${respuesta.error}`
            })
        }
    }
    return res.json({
        data: respuesta.data
    })
})

rutaApiProductos.get("/:id", async (req,res)=>{
    const id = req.params.id;
    const todosLosProductos = await contenedor.getById(id);
    
    if(todosLosProductos == null){
        return res.status(404).json({
            error: "Producto no encontrado"
        })
    }

    res.json(todosLosProductos);
})

rutaApiProductos.post("/", administrador, validarDatos, async(req,res)=>{
    const nuevoId = await contenedor.save(req.body);

    return res.json({
        msg: `el producto se a creado existosamente su id es: ${nuevoId}`
    })
})

rutaApiProductos.put("/:id", administrador, validarDatos, async(req,res)=>{
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

rutaApiProductos.delete("/:id", administrador, async(req,res)=>{
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

module.exports = rutaApiProductos;