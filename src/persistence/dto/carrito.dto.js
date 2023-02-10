class CarritoDTO {
    constructor({ _id, user, productos }) {
        this._id = _id
        this.user = user
        this.productos = productos
    }
}

const asDto = (carrito) => {
    if(Array.isArray(carrito))
        return carrito.map(d => new CarritoDTO(d))
    else
        return new CarritoDTO(carrito)
}

module.exports = { asDto }