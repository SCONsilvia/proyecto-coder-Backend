# Guia de rutas del proyecto

## Rutas Usuario
#### registrarse o agregar nuevo usuario
POST  http://localhost:8080/api/login/nuevo

Ejemplo de datos a poner en el postman
```
{
    "email": "usuario@gmail.com",
    "contrasena": "1234",
    "nombre": "usuario",
    "direccion": "Avenida ramdon",
    "foto": "https://www.elmueble.com/medio/2023/01/03/gato-gigante-de-raza-maine-coon_d2eb0c4b_230103105112_900x900.jpg",
    "numero": "00000000000",
    "edad": "180"
}
```

#### Ingresar con usuario y contrase;a
POST  http://localhost:8080/api/login/

Ejemplo de datos a poner en el postman
```
{
    "email": "usuario@gmail.com",
    "contrasena": "1234"
}
```

#### Ir al home del usuario
GET  http://localhost:8080/api/login/

## Rutas carrito

#### Ver carrito del carrito
Get http://localhost:8080/api/carrito/

### Meter un item en el carrito
POST http://localhost:8080/api/carrito/

Ejemplo de datos a poner en el postman
```
{
    "idProducto" : "63814345372280a8235bfd6b",
    "cantidad" : "2"
}
```

### Borrar un item delcarrito
DELETE http://localhost:8080/api/carrito/

Ejemplo de datos a poner en el postman
```
{
    "idProducto": "63814345372280a8235bfd6b"
}
```

### Finalizar la compra 
GET http://localhost:8080/api/carrito/finalizarCompra


## Rutas Productos
### Crear un nuevo producto
POST http://localhost:8080/api/productos/

Ejemplo de datos a poner en el postman
```
{
    "nombre": "producto",
    "descripcion": "descripcion del producto",
    "precio": "100",
    "codigo": "codigoDelProducto",
    "stock": "10",
    "foto": "https://http2.mlstatic.com/D_NQ_NP_621491-MLA48680897402_122021-O.jpg"
}
```

### Ver todos los productos
GET http://localhost:8080/api/productos/

### Obtener un producto
GET http://localhost:8080/api/productos/idDelProducto

Ejemplo
GET http://localhost:8080/api/productos/6388e73d142de044480b2ba2

### Borrar un producto
DELETE http://localhost:8080/api/productos/idDelProducto

Ejemplo
DELETE http://localhost:8080/api/productos/6388e73d142de044480b2ba2

## .env ejemplo
MONGO_ATLAS = urlDeMongoAtlas

EMAIL=correo@gmail.com

PASSWORD=contrasenaDeLaCuentaDeGmail

PORT_GMAIL=465

TELEFONO=whatsapp:+00000000000EsteNumeroTeLoPropocionaTwilio

SID=SIDQuePropocionaTwilio

TOKEN=TOKENQueTePropocionaTwilio

TELEFONOADMIN=whatsapp:+00000000000

## Para ejecutar en modo cluster
En la consola deben escribir

node index.js --modo=cluster