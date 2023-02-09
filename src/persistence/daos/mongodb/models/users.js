const mongoose = require("mongoose");

const usersCollectionName = "users";

const usersSchema = new mongoose.Schema({
    nombre: { type: String, require: true },
    email: { type: String, require: true },
    contrasena: { type: String, require: true },
    direccion: { type: String, require: true },
    edad: { type: Number, require: true },
    numero: { type: Number, require: true },
    foto: { type: String, require: true },
    admin: { type: Boolean, default: false },
}, { timestamps: true });

const UsersModel = mongoose.model(usersCollectionName, usersSchema);

module.exports = { usersCollectionName, UsersModel };
