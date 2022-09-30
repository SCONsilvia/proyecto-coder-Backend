const fs = require('fs');

class Contenedor {
    nombreDeArchivo;
    id;

    constructor(nombreDeArchivo) {
        this.nombreDeArchivo = "./"+nombreDeArchivo;
        this.id = 1;
    }

    async save(data){
        try{
            let arr = [];
            try{
                const archivo = await fs.promises.readFile(this.nombreDeArchivo, "utf-8");
                if(archivo !== ""){
                    arr = JSON.parse(archivo);
                    arr.sort((a,b)=> a.id-b.id);
                    this.id = arr[arr.length-1].id+1;
                }
            }catch(err){
                console.warn(err.message);
            }finally{
                data.id = this.id;
                arr.push(data);
                const dataAGuardar = JSON.stringify(arr);
                await fs.promises.writeFile(this.nombreDeArchivo, dataAGuardar);
                return this.id;
            }
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

const producto1 = {
    nombre: "Lapiz",
    precio: 100,
}

const producto2 = {
    nombre: "Marcador",
    precio: 200,
}

const producto3 = {
    nombre: "Calculadora",
    precio: 500.15,
}

const producto4 = {
    nombre: "Pan",
    precio: 88,
}



/* const funcionAsync = async () =>{
    const contenedor = new Contenedor("productos.txt");
    try{
        let id = await contenedor.save(producto1);
        console.log(id);
        id = await contenedor.save(producto2);
        console.log(id);
        id =await contenedor.save(producto3);
        console.log(id);
        id =await contenedor.save(producto4);
        console.log(id);
        let resGetAll = await contenedor.getAll();
        console.log(resGetAll);
        const unItem =  await contenedor.getById(4);
        console.log(unItem);
        await contenedor.deleteById(3);
        resGetAll = await contenedor.getAll();
        console.log(resGetAll);
        await contenedor.deleteAll();//borra todo
    }catch(err){
        console.log(err);
    }
}

funcionAsync(); */



const contenedor = new Contenedor("productos.txt");
contenedor.save(producto1).then(()=>{
    contenedor.save(producto2).then(()=>{
        contenedor.save(producto3).then(()=>{
            contenedor.save(producto4).then(()=>{
                contenedor.getAll().then((respuesta)=>{
                    console.log(respuesta);
                    contenedor.getById(5).then((r)=>{
                        console.log(r);
                        contenedor.deleteById(1).then(()=>{
                            contenedor.getAll().then((re)=>{
                                console.log(re);
                                contenedor.deleteAll().then(()=>{

                                })
                            })
                        })
                    })
                })
            })
        })
    })
})

