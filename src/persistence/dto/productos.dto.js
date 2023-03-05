class ProductosDTO {
    constructor({ _id, nombre, descripcion, precio, codigo, stock, foto }) {
        this.id = _id
        this.nombre = nombre
        this.descripcion = descripcion
        this.precio = precio
        this.codigo = codigo
        this.stock = stock
        this.foto = foto
    }
}

const asDto = (user) => {
    if(Array.isArray(user))
        return user.map(d => new ProductosDTO(d))
    else
        return new ProductosDTO(user)
}

module.exports = { asDto }