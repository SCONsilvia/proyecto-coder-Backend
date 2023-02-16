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

let idProduct;

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
        idProduct = response.data.msg.substring(48);
        console.log(idProduct);
    }catch (data){
        console.log(data.err);
    }
}

const getByIdProducto = async(id) => {
    try{
        const url2 = url + id
        const response = await axios.get(url2);
        console.log(response.data);
    }catch (data){
        console.log(data.err);
    }
}

const update = async(id, data) => {
    try{
        const url2 = url + id
        const response = await axios.put(url2, data);
        console.log(response.data);
    }catch (data){
        console.log(data.err);
    }
}

const borrar = async(id) => {
    try{
        const url2 = url + id
        const response = await axios.delete(url2);
        console.log(response.data);
    }catch (data){
        console.log(data.err);
    }
}
const prueba1 = async () =>{
    console.log("empezando prueba 1");
    console.log("obtener todo");
    await getAll();
    console.log("nuevo producto");
    await postNuevoProducto();
    console.log("obtener todo *2");
    await getAll();
    console.log("obtener un producto por id");
    await getByIdProducto(idProduct);
    console.log("actualizar producto");
    await update(idProduct, {
        nombre: "Nintendo switch 4",
        descripcion: "La nueva nintendo",
        precio: "4000",
        codigo: "PS5456",
        stock: "11",
        foto: "https://http2.mlstatic.com/D_NQ_NP_860235-MLA47920360779_102021-O.jpg"
    })
    console.log("obtener producto por id");
    await getByIdProducto(idProduct);
    console.log("borrar producto");
    await borrar(idProduct);
    console.log("obtener todo");
    await getAll();
    console.log("obtener un producto");
    await getByIdProducto(idProduct);
}

prueba1();
