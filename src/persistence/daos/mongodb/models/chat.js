const mongoose = require("mongoose");

const chatsCollectionName = "chats";

const chatsSchema = new mongoose.Schema({
    author: {
        email: { type: String, require: true },
        nombre: { type: String, require: true },
        apellido: { type: String, require: true },
        edad: { type: Number, require: true },
        alias: { type: String, require: true },
        avatar: { type: String, require: true },
    },
    mensaje: { type: String, require: true },
}, { timestamps: true });

const ChatsModel = mongoose.model(chatsCollectionName, chatsSchema);

module.exports = { ChatsModel, chatsCollectionName };
