const mongoose = require("mongoose");

const connectionString = process.env.MONGO_ATLAS || "mongodb://localhost:27017/coderhouse";

const initMongoDB = async () => {
    try {
        await mongoose.connect(connectionString);
    } catch (err) {
        //loggers().error(err);
        return err;
    }
};

module.exports = { initMongoDB };
