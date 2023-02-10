const { twilioClient } = require("../services/mensajeWhatsApp");

const sendWS = async(mensaje) => {
    try {
        const message = {
            body: mensaje,
            from: process.env.TELEFONO,
            to: process.env.TELEFONOADMIN
        };
        const respuesta = await twilioClient.messages.create(message);
        return { data: respuesta, status: true, err: null };
    } catch(err) {
        return { data: null, status: false, err: err };
    }
}

const sendWSUser = async(mensaje, numero) => {
    try {
        let numeroDeUsuaio = numero.toString();
        numeroDeUsuaio = "whatsapp:+" + numeroDeUsuaio;
        const message = {
            body: mensaje,
            from: process.env.TELEFONO,
            to: numeroDeUsuaio
        };
        const respuesta = await twilioClient.messages.create(message);
        return { data: respuesta, status: true, err: null };
    } catch(err) {
        return { data: null, status: false, err: err };
    }
}

module.exports = { sendWS, sendWSUser };
