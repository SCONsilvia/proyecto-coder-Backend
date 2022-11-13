const knex = require("knex");

class ClientMariaDB {
    constructor(config){
        this.knex = knex(config);
        this.nombreDeTabla = "productos"
        this.createTable();
    }

    async createTable( ){
        const exis = await this.knex.schema.hasTable(this.nombreDeTabla);
        if(!exis){
            await this.knex.schema.createTable(this.nombreDeTabla, table => {
            table.increments("id").primary();
            table.string("nombre",50).notNullable();
            table.string("codigo",100).notNullable();
            table.integer("precio");
            table.integer("stock");
            table.timestamp('timestamp').defaultTo(this.knex.fn.now())
            table.string("foto").notNullable();
            table.string("descripcion").notNullable();
            })
        }
    }

    async getAllProducts(){
        return await this.knex.from(this.nombreDeTabla).select("*");
    }

    async insertProduct(product){//recibe un objeto o un arr de obj
        return await this.knex(this.nombreDeTabla).insert(product);
    }

    async getById(id){
        return await this.knex.from(this.nombreDeTabla).where("id", id);
    }

    async deleteProductById(id){
        return await this.knex.from(this.nombreDeTabla).where("id", id).del();
    }

    async deleteProductByAll(){
        await this.knex.schema.dropTable(this.nombreDeTabla);
        this.createTable();
    }

    async updateById(id,{nombre,codigo,precio,stock,timestamp,foto,descripcion}){
        return await this.knex.from(this.nombreDeTabla).where("id", id).update({stock,nombre,codigo,precio,timestamp,foto,descripcion});
    }

    async updateStockById(stock,id){
        await this.knex.from(this.nombreDeTabla).where("id", id).update({stock: stock});
    }

    async close(){
        await this.knex.destroy();
    }
}

module.exports = ClientMariaDB;