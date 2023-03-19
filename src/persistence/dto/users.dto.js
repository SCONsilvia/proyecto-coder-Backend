class UsersDTO {
    constructor({ nombre, email, direccion, edad, numero, foto, admin }) {
        this.nombre = nombre
        this.email = email
        this.direccion = direccion
        this.edad = edad
        this.numero = numero
        this.foto = foto
    }
}

const asDto = (user) => {
    if(Array.isArray(user))
        return user.map(d => new UsersDTO(d))
    else
        return new UsersDTO(user)
}

module.exports = {UsersDTO, asDto}
