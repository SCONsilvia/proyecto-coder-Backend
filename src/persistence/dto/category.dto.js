class CategoryDTO {
    constructor({ _id, nombre, descripcion}) {
        this._id = _id
        this.nombre = nombre
        this.descripcion = descripcion
    }
}

const asDto = (categorias) => {
    if(Array.isArray(categorias))
        return categorias.map(d => new CategoryDTO(d))
    else
        return new CategoryDTO(categorias)
}

module.exports = { asDto }