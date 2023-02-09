const mongoose = require("mongoose");
const { productsCollectionName } = require("./productos");

const productsCarritoCollectionName = "productoCarrito";

const productsCarritoSchema = new mongoose.Schema({
    cantidad: { type: Number, require: true },
    productoId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: productsCollectionName,
        require: true,
    },
}, { timestamps: true });

const ProductsCarritoModel = mongoose.model(productsCarritoCollectionName, productsCarritoSchema);

module.exports = { productsCarritoCollectionName, ProductsCarritoModel };
