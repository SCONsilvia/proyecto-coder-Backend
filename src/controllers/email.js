const {transporter} = require("../services/email");

const sendGmailNewUser = async(req, res) => {
    const { email, nombre, direccion } = req.body;
    const mailOpttions = {
        from: process.env.EMAIL,
        to: email,
        subject: "Nuevo registro",
        html: `<h1>${nombre} se acaba de registar</h1><p>Correo: ${email}</p></br><p>direccion: ${direccion}</p>`,
        attachments: [
            {
                path: process.cwd() + "/adjunto.txt",
                filename: "ImagenDelUsuario.txt"
            }
        ]
    };
    try{
        const response = transporter.sendMail(mailOpttions);
        console.log("ya se envio el mail");
        return { data: response, status: true, err: null };
    }catch(err){
        console.log(err);
        return { data: null, status: false, err: err };
    }
}

const sendGmailCompraFinalizada = async(req, res, productos) => {
    const { email, nombre } = req.body;
    const mailOpttions = {
        from: process.env.EMAIL,
        to: email,
        subject: `Nuevo pedido de ${nombre} ${email}`,
        html: `<h1>Lista de productos</h1><p>${JSON.stringify(productos)}</p>`,
    };
    try{
        const response = transporter.sendMail(mailOpttions);
        console.log(`ya se envio el mail nuevo pedido de ${email}`);
        return { data: response, status: true, err: null };
    }catch(err){
        console.log(err);
        return { data: null, status: false, err: err };
    }
}


module.exports = {sendGmailNewUser, sendGmailCompraFinalizada} ;
