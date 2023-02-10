const mongoose = require("mongoose");

const chatsCollectionName = "chats";

const chatsSchema = new mongoose.Schema({
    user: { 
        type: mongoose.Schema.Types.ObjectId,
        ref: "users",
    },
    mensaje: { type: String, require: true },
}, { timestamps: true });

const ChatsModel = mongoose.model(chatsCollectionName, chatsSchema);

module.exports = { ChatsModel, chatsCollectionName };
