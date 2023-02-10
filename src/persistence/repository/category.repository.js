const { asDto } = require("../dto/category.dto");
const { categoryFactory } = require("../daos/category.factory");

class CategoryRepository {
    constructor() {
        this.dao = categoryFactory.getDao();
    }

    async getById(id) {
        const categorys = await categoryFactory.getById(id);
        if(categorys.data){
            const productDtoo = asDto(categorys.data);
            categorys.data =  productDtoo;
        }
        return categorys;
    }

    async getAll() {
        const categorys = await categoryFactory.getAll();
        if(categorys.data){
            const productDtoo = asDto(categorys.data);
            categorys.data =  productDtoo;
        }
        return categorys;
    }

    async save(data) {
        return await categoryFactory.save(data);
    }

    async actualizarPorId(id, nuevaData) {
        return await categoryFactory.actualizarPorId(id, nuevaData);
    }

    async deleteById(id) {
        return await categoryFactory.deleteById(id);
    }
}

const categoryRepository = new CategoryRepository;

module.exports = { categoryRepository };