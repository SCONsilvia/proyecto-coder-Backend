class ChatDTO {
    constructor({ user,  mensaje, createdAt }) {
        this.user = user
        this.mensaje = mensaje
        this.timestamps = createdAt
    }
}

const asDto = (chat) => {
    if(Array.isArray(chat))
        return chat.map(d => new ChatDTO(d))
    else
        return new ChatDTO(chat)
}

module.exports = { asDto }