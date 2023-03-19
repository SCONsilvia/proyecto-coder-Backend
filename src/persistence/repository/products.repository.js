const { asDto } = require("../dto/productos.dto");
const { productsFactory } = require("../daos/productos.factory");

class ProductsRepository {
    constructor() {
        this.dao = productsFactory.getDao();
    }

    async getById(id) {
        const products = await productsFactory.getById(id);
        if(products.data){
            const productDtoo = asDto(products.data);
            products.data =  productDtoo;
        }
        return products;
    }

    async save(data) {
        return await productsFactory.save(data);
    }
    
    async getAll() {
        const products = await productsFactory.getAll();
        if(products.data){
            const productDtoo = asDto(products.data);
            products.data =  productDtoo;
        }
        return products;
    }

    async actualizarPorId(id, nuevaData) {
        return await productsFactory.actualizarPorId(id, nuevaData);
    }

    async deleteAll() {
        return await productsFactory.deleteAll();
    }

    async deleteById(id) {
        return await productsFactory.deleteById(id);
    }
}

const productsRepository = new ProductsRepository;

module.exports = { productsRepository };