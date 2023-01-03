const mongoose = require("mongoose");

const usersCollectionName = "users";

const usersSchema = new mongoose.Schema({
    email: { type: String, require: true },
    contrasena: { type: String, require: true },
    admin: { type: Boolean, default: false },
}, { timestamps: true });

const UsersModel = mongoose.model(usersCollectionName, usersSchema);

module.exports = { usersCollectionName, UsersModel };
