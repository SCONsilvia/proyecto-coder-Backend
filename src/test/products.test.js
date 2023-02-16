const { server } = require("../../index");
const mongoose = require("mongoose");
const request = require("supertest");
const { productsRepository } = require("../persistence/repository/products.repository");
let idProduct = 0;

describe("Tests api productos", () => {
    beforeAll(async() => {
        await mongoose.connection.collections["productos"].drop() //limpiamos la coleccion
    });

    it("Obtener todos los productos y no hay ninguno", async () => {
        const response = await request(server)
            .get("/api/productos")
            expect(response.statusCode).toBe(200);
            expect(response.body.data).toHaveLength(0);
    });

    it("Crear nuevo producto", async () =>{
        const data = {
            nombre: "PS5",
            descripcion: "La nueva play",
            precio: "1000",
            codigo: "PS5456",
            stock: "11",
            foto: "https://http2.mlstatic.com/D_NQ_NP_860235-MLA47920360779_102021-O.jpg"
        }
        const response = await request(server).post("/api/productos").send(data)
        expect(response.statusCode).toBe(200);
        expect(true).toBe(response.body.msg.includes("el producto se a creado existosamente su id es:"));
        idProduct = response.body.msg.substring(48)
        
    }); 

    it("Obtener todos los productos", async () => {
        const response = await request(server)
            .get("/api/productos")
            expect(response.statusCode).toBe(200);
            expect(response.body.data).toHaveLength(1);
    });

    it("Actualizar un producto", async () => {
        const data = {
            nombre: "xbox",
            descripcion: "La nueva play",
            precio: "1000",
            codigo: "PS5456",
            stock: "11",
            foto: "https://http2.mlstatic.com/D_NQ_NP_860235-MLA47920360779_102021-O.jpg"
        }
        const response = await request(server)
            .put(`/api/productos/${idProduct}`)
            .send(data)
        expect(response.statusCode).toBe(200);
        expect(true).toBe(response.body.msg.includes("Elemento actualizado exitosamente"));
                    
    });

    it("Obtener un producto por id", async () => {
        const data = {
            nombre: "xbox",
            descripcion: "La nueva play",
            precio: "1000",
            codigo: "PS5456",
            stock: "11",
            foto: "https://http2.mlstatic.com/D_NQ_NP_860235-MLA47920360779_102021-O.jpg"
        }
        const response = await request(server)
            .get(`/api/productos/${idProduct}`)
        expect(response.statusCode).toBe(200);
        expect(response.body.data.nombre).toBe(data.nombre)               
    });

    it("Crear mas productos y obtenerlos todos", async () =>{
        const data = {
            nombre: "PS5",
            descripcion: "La nueva play",
            precio: "1000",
            codigo: "PS5456",
            stock: "11",
            foto: "https://http2.mlstatic.com/D_NQ_NP_860235-MLA47920360779_102021-O.jpg"
        }
        await productsRepository.save(data); 
        data.nombre = "Nintendo"
        await productsRepository.save(data); 
        const response = await request(server)
            .get("/api/productos")
        expect(response.statusCode).toBe(200);
        expect(response.body.data).toHaveLength(3);
    }); 

    it("Borrar un producto", async () =>{
        const response = await request(server)
            .delete(`/api/productos/${idProduct}`)
        expect(response.statusCode).toBe(200);
        expect(true).toBe(response.body.msg.includes("Elemento eliminado exitosamente"));
        
    });

    it("Ver que un producto no exista", async () => {
        const response = await request(server)
            .get(`/api/productos/${idProduct}`)
        expect(response.statusCode).toBe(200);
        expect(true).toBe(response.body.data.includes("no existe esa data"));            
    });

    it("Obtener todos los productos para comproba que efectivamente se borro 1", async () => {
        const response = await request(server)
            .get("/api/productos")
            expect(response.statusCode).toBe(200);
            expect(response.body.data).toHaveLength(2);
    });
})
