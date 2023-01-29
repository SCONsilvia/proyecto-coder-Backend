
const { CarritoModel } = require("../models/carrito");
const { ProductsCarritoModel } = require("../models/productoCarrito");
const { ProductsModel } = require("../models/productos");

class ControllersCarrito {
    async save(data, user){
        try {
            //vemos si el carrito de tal usuario ya existe o no
            const carrito = await CarritoModel.find({ user : user });
            const buscandoProducto = await ProductsModel.findById(data.idProducto);
            if(carrito.length > 0){
                //si existe tenemos que ver si el producto esta o no
                const existeProductoEnElCarrio = await carrito[0].populate({
                    path: "productos",
                    match: {productoId: {$eq:data.idProducto}}
                })
                if(existeProductoEnElCarrio.productos.length > 0){
                    //El producto si esta asi que debemos hacer esto
                    const productoCarritoModificado = await ProductsCarritoModel.findById(existeProductoEnElCarrio.productos[0]._id)
                    productoCarritoModificado.cantidad = data.cantidad;
                    productoCarritoModificado.save();

                }else{
                    //el producto no esta asi que debemos crearlo 
                    const nuevoProductocarrito = await ProductsCarritoModel.create({productoId: buscandoProducto, cantidad: data.cantidad});
                    existeProductoEnElCarrio.productos.push(nuevoProductocarrito)
                    existeProductoEnElCarrio.save();
                }
            }else{
                //el carrito no existe para ese usuario asi que lo creamos
                const nuevoCarrito = await CarritoModel.create({user: user});
                const nuevoProductocarrito = await ProductsCarritoModel.create({productoId: buscandoProducto, cantidad: data.cantidad});
                nuevoCarrito.productos.push(nuevoProductocarrito)
                nuevoCarrito.save();

            }
            const carritoModificado = await CarritoModel.find({ user : user });
            return { data: carritoModificado, status: true, err: null };
        }catch(err){
            console.log("hubo un error en el guardado puede que el producto no exista", err);
            return { data: null, status: false, err: "hubo un error en el guardado puede que el producto no exista" };
        }
    }

    async deleteProductById(idProducto, user){
        try {
            const carritoDelUsuario = await CarritoModel.find({ user : user });
            const buscandoProductoEnElCarrito = await carritoDelUsuario[0].populate({
                path: "productos",
                match: {productoId: {$eq:idProducto}}
            })
            if(buscandoProductoEnElCarrito.productos.length == 0){
                return { data: null, status: false, err: "Producto No encontrado" };
            }else{
                
                const data = await ProductsCarritoModel.findByIdAndDelete(buscandoProductoEnElCarrito.productos[0]._id)
                buscandoProductoEnElCarrito.productos.pull(buscandoProductoEnElCarrito.productos[0])
                buscandoProductoEnElCarrito.save()
                if (data == null) {
                    return { data: null, status: false, err: "Elemento no encontrado" };
                }
                return { data: null, status: true, err: null };
        }
        } catch(err) {
            console.log(err);
            return { data: null, status: false, err: err };
        }
    } 

    async deleteTodoElCarritoById(user){
        try {
            const buscarCarritoDelUsuario = await CarritoModel.find({ user : user });
            const carritoDelUsuario = await CarritoModel.findByIdAndDelete(buscarCarritoDelUsuario[0]._id);
            if (carritoDelUsuario == null) {
                return { data: null, status: false, err: "carrito  no encontrado" };
            }
            return { data: null, status: true, err: null };
        } catch(err) {
            console.log(err);
            return { data: null, status: false, err: err };
        } 
    } 

    async getById(user){
        try {
            const data = await CarritoModel.find({ user : user });
            if (data == null) {
                return { data: null, status: false, err: "carrito vacio para ese usuario" };
            }
            return { data: data, status: true, err: null };
        } catch(err) {
            return { data: null, status: false, err: err };
        }
    }

    async finalizarCompra(user){
        try {
            const data = await CarritoModel.find({ user : user });
            if (data.length == 0) {
                return { data: null, status: false, err: "No tiene nada en el carrito" };
            }
            const carritocompleto = await data[0].populate({
                path: "productos",
            })
            const productos = [];
            if(carritocompleto.productos.length == 0){
                return { data: null, status: false, err: "No tienes nada en el carrito" };
            }
            for(let i = 0; i < carritocompleto.productos.length; i++){
                const unProducto = await ProductsModel.findById(carritocompleto.productos[i].productoId);
                productos.push({
                    nombreDelProducto: unProducto.nombre,
                    cantidad: carritocompleto.productos[i].cantidad,
                })
            }
            return { data: productos, status: true, err: null };
        } catch(err) {
            return { data: null, status: false, err: err };
        }
    }
}

module.exports = ControllersCarrito;
