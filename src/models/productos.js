if (process.env.MODE == "desarrollo") {
const mongoose = require("mongoose");
const {categoryCollectionName} = require("./categorias");

const productsCollectionName = "productos";

const productsSchema  = new mongoose.Schema({
    nombre : {type: String, require: true},
    descripcion : {type: String, require: true},
    precio : {type: Number, require: true},
    codigo : {type: String, require: true},
    stock : {type: Number, require: true},
    foto : {type: String, require: true},
    categoryId : {
        type : mongoose.Schema.Types.ObjectId,
        ref : categoryCollectionName,
        require: true,
    }
},{ timestamps: true })

const ProductsModel = mongoose.model(productsCollectionName, productsSchema);

module.exports = {productsCollectionName, ProductsModel}
}