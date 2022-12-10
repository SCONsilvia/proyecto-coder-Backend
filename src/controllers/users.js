const { ProductsModel } = require("../models/productos");
const {UsersModel} = require("../models/users");

class ControllersUsers {
    async save(data){
        try{
            const r = await this.existeEmail(data.email);
            console.log(r);
            if(r.data){
                const nuevoUsuari = await UsersModel.create(data);
                return {data:`el ususaio se a creado existosamente su id es: ${nuevoUsuari._id}`, status: true, err:null};
            }
            return {data:"email ya existente", status: true, err:null}
        }catch(err){
            console.log("hubo un error en el guardad del nuevo usuario", err);
            return {data:null, status: false, err:err};
        }
    }

    async existeEmail(email){
        try{
            const data = await UsersModel.find({email : {$eq : email}});
            console.log(data.length);
            if(data.length){//existe
                return {data:false, status: false, err:null};
            }
            return {data:true, status: true, err:null};
        }catch(err){
            return {data:null, status: false, err:err};
        }
        
    }

    async buscarUsuarioEmailContrasena(data){
        try{
            const r = await UsersModel.find({$and : [
                {email : {$eq : data.email}},
                {contrasena : {$eq : data.contrasena}}
            ]});
            if(r.length){
                return {data:r, status: true, err:null};
            }
            return {data:null, status: false, err:"no se puede logear con ese user y contrasena"};
        }catch(err){
            return {data:null, status: false, err:err};
        }
        
    }
}

module.exports = ControllersUsers;