const { buildSchema } = require("graphql");
const { postNuevoUserControllers, postIngresoControllers, getDataControllers, getLogoutControllers } = require("../../controllers/loginGraphql.contollers");

const graphqlLoginSchema = buildSchema(`
    type User{
        id : String!
        nombre : String
        email : String
        contrasena : String
        direccion : String
        edad : Int
        numero : String
        foto : String
        admin : Boolean
    }
    
    type Query{
        getDataControllers:User
    }
    input UserInput{
        email : String!
        contrasena : String!
    }

    type Mutation{
        postIngresoControllers(data:UserInput):String
    }
`)

const graphqlLoginRoot = {
    postNuevoUserControllers, postIngresoControllers, getDataControllers, getLogoutControllers
}

module.exports = { graphqlLoginSchema, graphqlLoginRoot }