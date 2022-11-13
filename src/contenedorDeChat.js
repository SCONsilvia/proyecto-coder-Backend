const fs = require("fs");
const {v4} = require("uuid");
const moment = require("moment");
const ClientSQL =  require("./db/sqlClient");
const sqlConfig = require("./db/sqlConfig");

const sql = new ClientSQL(sqlConfig);

class ContenedorDeChat{
    constructor(nombreDeArchivo) {
        this.nombreDeArchivo = "./"+nombreDeArchivo;

    }

    async save(data){
        try{
            data.id = v4();
            data.fecha = moment().format('Do MMMM YYYY, h:mm:ss a')
            const nuevoId = await sql.insertProduct(data);
            console.log(nuevoId);
            return {data:nuevoId, status: true, err:null};
        }catch(err){
            console.log("hubo un error en el guardado", err);
            return {data:null, status: false, err:err};
        }
    }

    async getAll(){
        try{
            const data = await sql.getAllMessage();
            return {data:data, status: true, err:null};
        }catch(err){
            return {data:null, status: false, err:err};
        }
    }
}

module.exports = ContenedorDeChat;