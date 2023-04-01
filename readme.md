# Guia de rutas del proyecto

## Ruta para la documentacion:
    http://localhost:8080/docs/

## .env ejemplo
MONGO_ATLAS = urlDeMongoAtlas

EMAIL=correo@gmail.com

PASSWORD=contrasenaDeLaCuentaDeGmail

PORT_GMAIL=465

TELEFONO=whatsapp:+00000000000EsteNumeroTeLoPropocionaTwilio

SID=SIDQuePropocionaTwilio

TOKEN=TOKENQueTePropocionaTwilio

TELEFONOADMIN=whatsapp:+00000000000

Opcional poner DOMAIN para establecer el dominio de las cookies el local no se usa
DOMAIN = railway.app
## Para ejecutar en modo cluster
En la consola deben escribir

node index.js --modo=cluster