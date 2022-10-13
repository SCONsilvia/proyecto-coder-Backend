const {app} = require("./src/services/server")

const puerto = 8080;

const server = app.listen(puerto, ()=>{
    console.log(`Servidor http escuchando en el puerto ${server.address().port}`);
})

server.on("error",(error) => console.log(`error en el servidos ${error}`))

