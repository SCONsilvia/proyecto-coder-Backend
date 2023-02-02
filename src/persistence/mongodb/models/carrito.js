const mongoose = require("mongoose");

const carritoCollectionName = "carrito";

const carritoSchema = new mongoose.Schema({
    user: { 
        type: mongoose.Schema.Types.ObjectId,
        ref: "users",
    },
    productos: [{ 
        type: mongoose.Schema.Types.ObjectId,
        ref: "productoCarrito",
    }]
    
    /* [{ 
        type: mongoose.Schema.Types.ObjectId,
        ref: "productos",
        cantidad: { type: Number, require: true },
    }], */
}, { timestamps: true });

const CarritoModel = mongoose.model(carritoCollectionName, carritoSchema);

module.exports = { carritoCollectionName, CarritoModel };
