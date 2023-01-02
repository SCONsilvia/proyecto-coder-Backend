const mongoose = require("mongoose");

const categoryCollectionName = "categorias";

const categorySchema = new mongoose.Schema({
    nombre : {type : String, require : true},
    descripcion: {type : String, require : true}
});

const CategoryModel = mongoose.model(categoryCollectionName, categorySchema);

module.exports = {CategoryModel, categoryCollectionName};
