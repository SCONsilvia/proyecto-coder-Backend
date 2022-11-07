const fs = require("fs");

class ContenedorDeChat{
    constructor(nombreDeArchivo) {
        this.nombreDeArchivo = "./"+nombreDeArchivo;
    }

    save(data){
        try{
            let arr = []
            const lectura = this.getAll();
            if(lectura != ""){
                arr = lectura;
            }
            arr.push(data);
            const dataAGuardar = JSON.stringify(arr);
            fs.writeFileSync(this.nombreDeArchivo, dataAGuardar);
            return 0
        }
        catch(err){
            console.log(err);
        }
    }

    getAll(){
        try{
            const data = fs.readFileSync(this.nombreDeArchivo, 'utf-8');
            return JSON.parse(data)
        }catch(err){
            if(err.code == "ENOENT"){
                return "";
            }else{
                console.log(err);
                return -1;
            }
        }
    }
}

module.exports = ContenedorDeChat;