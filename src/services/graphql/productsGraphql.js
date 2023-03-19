const { buildSchema } = require("graphql");
const { getAllControllers, getByIdControllers, saveControllers, putControllers, deleteControllers } = require("../../controllers/productosGraphql.contollers");

const graphqlSchema = buildSchema(`
    type Product{
        id : String!
        nombre : String
        descripcion : String
        precio : Int
        codigo : String
        stock : Int
        foto : String
    }
    type Query{
        getAllControllers:[Product]
        getByIdControllers(id:String!):Product
    }
    input ProductInput{
        nombre : String!
        descripcion : String!
        precio : Int!
        codigo : String!
        stock : Int!
        foto : String!
    }
    input ProductEditInput{
        nombre : String!
        descripcion : String!
        precio : Int!
        codigo : String!
        stock : Int!
        foto : String!
    }
    type Mutation{
        saveControllers(data:ProductInput):String
        putControllers(id:String!, data:ProductEditInput):Product
        deleteControllers(id:String!):Boolean
    }
`)

const graphqlRoot = {
    getAllControllers,
    getByIdControllers,
    saveControllers, 
    putControllers, 
    deleteControllers
}

module.exports = { graphqlSchema, graphqlRoot }
