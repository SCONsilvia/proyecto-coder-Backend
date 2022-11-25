const mongoose = require("mongoose");

const chatsCollectionName = "chats";

const chatsSchema = new mongoose.Schema({
    email : {type : String, require : true},
    mensaje: {type : String, require : true}
},{ timestamps: true });

const ChatsModel = mongoose.model(chatsCollectionName, chatsSchema);

module.exports = {ChatsModel, chatsCollectionName};