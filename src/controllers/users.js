const { UsersModel } = require("../models/users");
const { encryptPassword, matchPassword } = require("../utils/utils");

class ControllersUsers {
    async save(data) {
        try {
            const existe = await this.existeEmail(data.email);
            if (!existe) {
                data.contrasena = await encryptPassword(data.contrasena);
                const nuevoUsuari = await UsersModel.create(data);
                return { data: nuevoUsuari, status: true, err: null };
            }
            return { data: "email ya existente", status: false, err: null };
        } catch(err) {
            console.log("hubo un error en el guardad del nuevo usuario", err);
            return { data: null, status: false, err: err };
        }
    }

    async existeEmail(email){
        try {
            const data = await UsersModel.find({ email: { $eq: email } });
            if (data.length) { // existe
                return true;
            }
            return false;
        } catch(err) {
            return false;
        }
    }

    async buscarUsuarioEmailContrasena(email, contrasena) {
        try {
            const r = await UsersModel.findOne({ email });
            /* const r = await UsersModel.find({$and : [
                {email : {$eq : data.email}},
                {contrasena : {$eq : data.contrasena}}
            ]}); */
            
            if (r) {
                const validar =  await matchPassword(contrasena, r.contrasena);
                if (validar) {
                    return { data: r, status: true, err: null };
                }
            }
            return { data: null, status: false, err: null };
        } catch(err) {
            return { data: null, status: false, err: err };
        }
    }

    async encontrarUnUsuario(id) {
        try {
            const user = await UsersModel.findById(id);
            if (user) {
                return { data: user, status: true, err: null };
            }
            return { data: null, status: false, err: null };
        } catch(err) {
            return { data: null, status: false, err: err };
        }
    }
}

module.exports = ControllersUsers;
