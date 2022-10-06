const fs = require('fs');

class Contenedor {
    constructor(nombreDeArchivo) {
        this.nombreDeArchivo = "./"+nombreDeArchivo;
    }

    async obtenerEstado(){
        let id = 1;
        let arr = [];
        return this.getAll().then((respuesta) => {
            arr = respuesta;
            if(arr.length >= 1){
                arr.sort((a,b)=> a.id-b.id);
                id = arr[arr.length-1].id+1;
            }
            return {id, arr};
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
            console.log("hubo un error en la lectura del archivo",err);
            return []
        }
    }

    async getById(id){
        try{
            const respuesta = await this.getAll()
            const estaONoEsta = respuesta.find(e => e.id === id);
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
            const estaONoEsta = respuesta.findIndex(e => e.id === id);
            if(estaONoEsta!=-1){
                const nuevoArr = respuesta.slice(0, estaONoEsta).concat(respuesta.slice(estaONoEsta+1));
                await fs.promises.writeFile(this.nombreDeArchivo, JSON.stringify(nuevoArr))
                console.log("eliminado exitosamente");
            }else{
                console.log("no se encontro ese id para eliminar");
            }
        }catch(err){
            console.log("Ocurrio un error",err);
            return err
        } 
    }

}









const contenedor = new Contenedor("src/productos.txt")

const express = require("express");
const app = express();

const puerto = 8080;

const server = app.listen(puerto, ()=>{
    console.log(`Servidor http escuchando en el puerto ${server.address().port}`);
})

server.on("error",(error) => console.log(`error en el servidos ${error}`))


app.get("/productos", async (req,res)=>{
    const todosLosProductos = await contenedor.getAll();
    res.json(todosLosProductos);
})

app.post("/productoRandom", async (req,res)=>{
    const todosLosProductos = await contenedor.getAll();
    const numeroRandom = Math.floor(Math.random()* todosLosProductos.length);
    res.json(todosLosProductos[numeroRandom]);
})