const knex = require("knex");

class ClientSQL {
    constructor(config){
        this.knex = knex(config);
        this.nombreDeTabla = "message"
        this.createTable();
    }

    async createTable( ){
        const exis = await this.knex.schema.hasTable(this.nombreDeTabla);
        if(!exis){
            await this.knex.schema.createTable(this.nombreDeTabla, table => {
            table.string("id").primary();
            table.string("email",100).notNullable();
            table.string("mensaje",500).notNullable();
            table.string("fecha",100).notNullable();
            })
        }
    }

    async getAllMessage(){
        return await this.knex.from(this.nombreDeTabla).select("*");
    }

    async insertProduct(data){//recibe un objeto o un arr de obj
        return await this.knex(this.nombreDeTabla).insert(data);
    }

    async close(){
        await this.knex.destroy();
    }
}

module.exports = ClientSQL;