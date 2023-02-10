const { asDto } = require("../dto/carrito.dto");
const { carritoFactory } = require("../daos/carrito.factory");
const { productsRepository } = require("../repository/products.repository");
const { usersRepository } = require("../repository/users.repository");

class CarritoRepository {
    constructor() {
        this.dao = carritoFactory.getDao();
    }
    
    async getById(idUser) {
        const carrito = await carritoFactory.getById(idUser);
        if(carrito.data){
            const carritoDtoo = asDto(carrito.data);
            carrito.data =  carritoDtoo;
            const dataUsuario = await usersRepository.getById(carrito.data.user);
            if(dataUsuario.status){
                carrito.data.user = dataUsuario.data;
            }
            const dataProducto = await Promise.all(carrito.data.productos.map(async (unProducto) => { 
                const unProductoModificado = await productsRepository.getById(unProducto.productoId._id);
                unProductoModificado.data.cantidad = unProducto.cantidad;
                return unProductoModificado.data
            }));
            if(dataProducto){
                carrito.data.productos = dataProducto;
            }
        }
        return carrito;
    }
    async save(data, user) {
        return await carritoFactory.save(data, user);
    }
    
    async deleteProductById(idProducto, user) {
        return await carritoFactory.deleteProductById(idProducto, user);
    }
    
    async deleteTodoElCarritoById(user) {
        return await carritoFactory.deleteTodoElCarritoById(user);
    }

    async finalizarCompra(user) {
        return await carritoFactory.finalizarCompra(user);
    }
}

const carritoRepository = new CarritoRepository;

module.exports = { carritoRepository };
