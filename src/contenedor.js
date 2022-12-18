const fs = require('fs');
const ClientMariaDB =  require("./db/mariadbClient");
const mariadbConfig = require("./db/mariadbConfig");

//PARA QUE FUNCION EN GLICH
const sqlConfig = require("./db/sqlConfig")

const dotenv = require("dotenv");
dotenv.config();

let mariadb;

if(process.env.MODE == "desarrollo"){
    mariadb = new ClientMariaDB(mariadbConfig);
}else{
    mariadb = new ClientMariaDB(sqlConfig);
}



/* const mariadb = new ClientMariaDB(mariadbConfig); */

class Contenedor {
    
    async save(data){
        try{
            const nuevoId = await mariadb.insertProduct(data);
            return {data:nuevoId, status: true, err:null};
        }catch(err){
            console.log("hubo un error en el guardado", err);
            return {data:null, status: false, err:err};
        }
    }

    async getAll(){
        try{
            const data = await mariadb.getAllProducts();
            return {data:data, status: true, err:null};
        }catch(err){
            return {data:null, status: false, err:err};
        }
    }

    async getById(id){
        try{
            const data = await mariadb.getById(id);
            if(data.length == 0){
                return {data:null, status: false, err:"no existe esa data"};
            }
            return {data:data, status: true, err:null};
        }catch(err){
            return {data:null, status: false, err:err};
        }
        
    }

    async actualizarPorId(id,nuevaData){
        try{
            const data = await mariadb.updateById(id,nuevaData);
            if(data == 0){
                return {data:null, status: false, err:"Elemento no encontrado"};
            }
            return {data:null, status: true, err:null};
        }catch(err){
            return {data:null, status: false, err:err};
        }
    }

    async deleteAll(){
        try{
            await mariadb.deleteProductByAll();
            return {data:null, status: true, err:null};
        }catch(err){
            console.log("Ocurrio un error al borrar todo",err)
            return {data:null, status: false, err:err};
        }
            
    }

    async deleteById(id){
        try{
            const data = await mariadb.deleteProductById(id);
            if(data == 0){
                return {data:null, status: false, err:"Elemento no encontrado"};
            }
            return {data:null, status: true, err:null};
        }catch(err){
            return {data:null, status: false, err:err};
        }
    }

}

module.exports = Contenedor;