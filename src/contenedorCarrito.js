const fs = require('fs');

const {v4} = require("uuid");

class Carrito {
    constructor(nombreDeArchivo){
        this.nombreDeArchivo = "./"+nombreDeArchivo;
    }

    crearCarrito(){
        const respuesta = this.getAll();
        let todosLosCarritos = respuesta.data;
        const nuevoCarrito = {
            id : v4(),
            timestamp : Date.now(),
            productos : []
        }
        if(todosLosCarritos == null){
            todosLosCarritos = [nuevoCarrito]

        }else{
            todosLosCarritos.push(nuevoCarrito);
        }
        try{
            const dataAGuardar = JSON.stringify(todosLosCarritos);
            fs.writeFileSync(this.nombreDeArchivo, dataAGuardar);
            return {data:nuevoCarrito.id, status: true, err:null};
        }catch(err){
            console.log(err);
            return {data:null, status: false, err:err}
        }
    }

    save(data, id){
        const respuesta = this.getAll();
        let carritos = respuesta.data;
        const indice = carritos.findIndex(element => element.id === id);
        if(indice == -1){
            console.log("No se encontro ese id de carrito");
            return {data:null, status: false, err:-1};
        }else{
            const itemExisteEnCarrito = carritos[indice].productos.findIndex(e => e.id == data.id);
            if(itemExisteEnCarrito != -1){
                carritos[indice].productos[itemExisteEnCarrito].cantidad +=1;
            }else{
                data.cantidad = 1;
                carritos[indice].productos.push(data);
            }
            try{
                const dataAGuardar = JSON.stringify(carritos);
                fs.writeFileSync(this.nombreDeArchivo, dataAGuardar);
                return {data:null, status: true, err:null}
            }catch(err){
                console.log(err);
                return {data:null, status: false, err:err}
            }
        }

    }
    
    getAll(){
        try{
            const data =fs.readFileSync(this.nombreDeArchivo, "utf-8");
            const carrito = JSON.parse(data);
            return {data:carrito, status: true, err:null};
        }catch(err){
            if(err.code == "ENOENT"){
                return "";
            }else{
                console.log(err);
                return -1;
            }
        }
    }

    getCarritoForId(id){
        const respuesta = this.getAll();
        const carritos = respuesta.data;
        const carrito = carritos.find(element => element.id === id);
        if(carrito == undefined){
            return {data:carrito, status: true, err:-1};
        }else{
            return {data:carrito, status: true, err:null};
        }
        
    }

    delete(id){
        const respuesta = this.getAll();
        const carritos = respuesta.data;
        const indice = carritos.findIndex(element => element.id === id);
        if(indice == -1){
            return {data:null, status: false, err:-1};
        }else{
            carritos.splice(indice, 1);
            const dataAGuardar = JSON.stringify(carritos);
            fs.writeFileSync(this.nombreDeArchivo, dataAGuardar);
            return {data:null, status: true, err:null};
        }
    }

    deleteForId(idCarrito,idProducto){
        const respuesta = this.getAll();
        const carritos = respuesta.data;
        const indiceCarrito = carritos.findIndex(element => element.id === idCarrito);
        if(indiceCarrito == -1){
            return {data:null, status: false, err:-1};
        }else{
            const indiceProducto = carritos[indiceCarrito].productos.findIndex(element => element.id == idProducto)
            if(indiceProducto == -1){
                return {data:null, status: false, err:-2};
            }else{
                carritos[indiceCarrito].productos.splice(indiceProducto, 1);
                const dataAGuardar = JSON.stringify(carritos);
                fs.writeFileSync(this.nombreDeArchivo, dataAGuardar);
                return {data:null, status: true, err:null};
            }
        }
    }

}

module.exports = Carrito;