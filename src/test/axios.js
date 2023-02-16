const axios = require("axios");

const url = "http://localhost:8080/api/productos/";

const data = {
    nombre: "Nintendo switch 2",
    descripcion: "La nueva play",
    precio: "1000",
    codigo: "PS5456",
    stock: "11",
    foto: "https://http2.mlstatic.com/D_NQ_NP_860235-MLA47920360779_102021-O.jpg"
}

const getAll = async() => {
    try{
        const response = await axios.get(url);
        console.log(response.data);
    }catch (data){
        console.log(data.err);
    }
}

const postNuevoProducto = async() => {
    try{
        const response = await axios.post(url, data);
        console.log(response.data);
    }catch (data){
        console.log(data.err);
    }
}

const getByIdProducto = async(id) => {
    try{
        const url2 = url + id
        console.log(url2);
        const response = await axios.get(url2);
        console.log(response.data);
    }catch (data){
        console.log("holaaaaaaaaaaaaaaaaaaaaaaa");
        console.log(data.err);
    }
}

const borrar = async(id) => {
    try{
        const url2 = url + id
        console.log(url2);
        const response = await axios.delete(url2);
        console.log(response.data);
    }catch (data){
        console.log(data.err);
    }
}

getAll();
//postNuevoProducto();
getByIdProducto("63eeac476baca89b3d8be01f");
borrar("63eeac476baca89b3d8be01f");
getByIdProducto("63eeac476baca89b3d8be01f");
