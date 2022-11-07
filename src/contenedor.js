const fs = require('fs');

class Contenedor {
    constructor(nombreDeArchivo) {
        this.nombreDeArchivo = "./"+nombreDeArchivo;
    }

    async obtenerEstado(){
        let id = 1;
        let arr = [];
        return this.getAll().then((respuesta) => {
            if(respuesta.tipo == -1){
                console.log(respuesta.errorMessage);
                return {id, arr};
            }else{
                arr = respuesta;
                if(arr.length >= 1){
                    arr.sort((a,b)=> a.id-b.id);
                    id = arr[arr.length-1].id+1;
                }
                return {id, arr};
            }
        }).catch((error) => {
            console.log(error.message);
            return {id, arr};
        })
    }
    
    async save(data){
        try{
            const nuevoObjectoConElArrYElId = await this.obtenerEstado();
            const nuevoId = nuevoObjectoConElArrYElId.id;
            const array = nuevoObjectoConElArrYElId.arr;
            data.id = nuevoId;
            data.timestamp = Date.now();
            array.push(data);
            const dataAGuardar = JSON.stringify(array);
            await fs.promises.writeFile(this.nombreDeArchivo, dataAGuardar);
            return nuevoId;
        }catch(err){
            console.log("hubo un error en la escritura del archivo", err);
            return err
        }
    }

    async getAll(){
        try{
            const data = await fs.promises.readFile(this.nombreDeArchivo, "utf-8");
            return JSON.parse(data);
        }catch(err){
            const error = {}

            if(err.code == "ENOENT"){
                error.tipo = -1;
            }else{
                error.tipo = -2;
            }
            error.errorMessage = err.message;
            return error
        }
    }

    async GetAll(){
        const data = await this.getAll();
        if(data.tipo === -1){
            return  {respuesta: false, error : "no existe elementos", data: null, tipo : -1}
        }else if(data.tipo === -2){
            return {respuesta: false, error : data.errorMessage, data: null, tipo : -2}
        }
        return  {respuesta: true, error : null, data:data, tipo : 0}
    }

    async getById(id){
        try{
            const respuesta = await this.getAll();
            const estaONoEsta = respuesta.find(e => e.id === parseInt(id));
            if(estaONoEsta !== undefined){
                return estaONoEsta;
            }else{
                return null
            }
        }catch(err){
            console.log("Ocurrio un error buscando",err)
            return err
        }
        
    }

    async actualizarPorId(id,nuevaData){
        try{   
            const todosLosProductos = await this.getAll();
            const indice = todosLosProductos.findIndex(e => e.id == id);

            if(indice < 0){
                return {respuesta: false, error : "no se encontro ese id para actualizar", dataActualizada: null}
            }

            nuevaData.id = todosLosProductos[indice].id;
            nuevaData.timestamp = todosLosProductos[indice].timestamp;
            todosLosProductos[indice] = nuevaData;

            await fs.promises.writeFile(this.nombreDeArchivo, JSON.stringify(todosLosProductos));
            return {respuesta: true, error : null, dataActualizada: nuevaData}
        }catch(err){
            console.log("Ocurrio al actualizar el archivo",err)
            return {respuesta: false, error : err.message, dataActualizada: null}
        }
    }

    async deleteAll(){
        try{
            await fs.promises.writeFile(this.nombreDeArchivo, "");
        }catch(err){
            console.log("Ocurrio un error al borrar todo",err)
            return err
        }
            
    }

    async deleteById(id){
        try {
            const respuesta= await this.getAll()
            const estaONoEsta = respuesta.findIndex(e => e.id == id);
            if(estaONoEsta!=-1){
                const nuevoArr = respuesta.slice(0, estaONoEsta).concat(respuesta.slice(estaONoEsta+1));
                await fs.promises.writeFile(this.nombreDeArchivo, JSON.stringify(nuevoArr))
                console.log("eliminado exitosamente");
                return {respuesta: true, error : null}
            }else{
                console.log("no se encontro ese id para eliminar");
                return {respuesta: false, error : "no se encontro ese id para eliminar"}
            }
        }catch(err){
            console.log("Ocurrio un error",err);
            return {respuesta: false, error : err.message}
        } 
    }

}

module.exports = Contenedor;