const mongoose = require("mongoose");

const connectionString = process.env.MONGO_ATLAS || "mongodb://localhost:27017/coderhouse";

const initMongoDB = async () => {
    try {
        //console.log("conectando");
        await mongoose.connect(connectionString);
        //console.log("Ya estamos conectado");
    } catch (err) {
        //console.log(err);
        return err;
    }
};

module.exports = { initMongoDB };
