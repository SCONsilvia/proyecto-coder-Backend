const { server } = require("../../index");
const mongoose = require("mongoose");
const request = require("supertest");
const chai = require("chai");
const { expect } = chai
const { productsRepository } = require("../persistence/repository/products.repository");


describe("Tests api productos", () => {
    beforeEach(async() => {
        await mongoose.connection.collections["productos"].drop() //limpiamos la coleccion
    });

    it("Obtener todos los productos y no hay ninguno", async () => {
        const response = await request(server)
            .get("/api/productos")
            expect(response.statusCode).to.eql(200);
            expect(response.body.data).to.have.lengthOf(0);
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
        expect(response.statusCode).to.eql(200);
        expect(true).to.eql(response.body.msg.includes("el producto se a creado existosamente su id es:"));
    }); 

    it("Obtener todos los productos", async () => {
        const data = {
            nombre: "PS5",
            descripcion: "La nueva play",
            precio: "1000",
            codigo: "PS5456",
            stock: "11",
            foto: "https://http2.mlstatic.com/D_NQ_NP_860235-MLA47920360779_102021-O.jpg"
        }
        await productsRepository.save(data); 

        const response = await request(server)
            .get("/api/productos")
            expect(response.statusCode).to.eql(200);
            expect(response.body.data).to.have.lengthOf(1);
    });

    it("Actualizar un producto", async () => {

        const data = {
            nombre: "PS5",
            descripcion: "La nueva play",
            precio: "1000",
            codigo: "PS5456",
            stock: "11",
            foto: "https://http2.mlstatic.com/D_NQ_NP_860235-MLA47920360779_102021-O.jpg"
        }
        const producto = await productsRepository.save(data); 
        const idProduct = producto.data

        const data2 = {
            nombre: "xbox",
            descripcion: "La nueva play",
            precio: "1000",
            codigo: "PS5456",
            stock: "11",
            foto: "https://http2.mlstatic.com/D_NQ_NP_860235-MLA47920360779_102021-O.jpg"
        }
        const response = await request(server)
            .put(`/api/productos/${idProduct}`)
            .send(data2)
        expect(response.statusCode).to.eql(200);
        expect(true).to.eql(response.body.msg.includes("Elemento actualizado exitosamente"));
                    
    });

    it("Obtener un producto por id", async () => {
        const data = {
            nombre: "PS5",
            descripcion: "La nueva play",
            precio: "1000",
            codigo: "PS5456",
            stock: "11",
            foto: "https://http2.mlstatic.com/D_NQ_NP_860235-MLA47920360779_102021-O.jpg"
        }
        const producto = await productsRepository.save(data); 
        const idProduct = producto.data
        const response = await request(server)
            .get(`/api/productos/${idProduct}`)
        expect(response.statusCode).to.eql(200);
        expect(response.body.data.nombre).to.eql(data.nombre)               
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
        expect(response.statusCode).to.eql(200);
        expect(response.body.data).to.have.lengthOf(2);
    }); 

    it("Borrar un producto", async () =>{
        const data = {
            nombre: "PS5",
            descripcion: "La nueva play",
            precio: "1000",
            codigo: "PS5456",
            stock: "11",
            foto: "https://http2.mlstatic.com/D_NQ_NP_860235-MLA47920360779_102021-O.jpg"
        }
        const producto = await productsRepository.save(data); 
        const idProduct = producto.data
        const response = await request(server)
            .delete(`/api/productos/${idProduct}`)
        expect(response.statusCode).to.eql(200);
        expect(true).to.eql(response.body.msg.includes("Elemento eliminado exitosamente"));
        
    });

    it("Ver que un producto no exista", async () => {
        const data = {
            nombre: "PS5",
            descripcion: "La nueva play",
            precio: "1000",
            codigo: "PS5456",
            stock: "11",
            foto: "https://http2.mlstatic.com/D_NQ_NP_860235-MLA47920360779_102021-O.jpg"
        }
        const producto = await productsRepository.save(data); 
        const idProduct = producto.data
        await productsRepository.deleteById(idProduct); 
        const response = await request(server)
            .get(`/api/productos/${idProduct}`)
        expect(response.statusCode).to.eql(200);
        expect(true).to.eql(response.body.data.includes("no existe esa data"));            
    });

    it("Obtener todos los productos para comproba que efectivamente se borro 1", async () => {
        const data = {
            nombre: "PS5",
            descripcion: "La nueva play",
            precio: "1000",
            codigo: "PS5456",
            stock: "11",
            foto: "https://http2.mlstatic.com/D_NQ_NP_860235-MLA47920360779_102021-O.jpg"
        }
        const producto = await productsRepository.save(data); 
        const idProduct = producto.data

        data.nombre = "Nintendo"
        await productsRepository.save(data); 

        data.nombre = "Xbox"
        await productsRepository.save(data); 

        await productsRepository.deleteById(idProduct); 


        const response = await request(server)
            .get("/api/productos")
            expect(response.statusCode).to.eql(200);
            expect(response.body.data).to.have.lengthOf(2);
    });
})
