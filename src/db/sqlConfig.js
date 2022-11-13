const path = require("path");
const direccionDeArchivoAGuardar = path.resolve(__dirname, '');

const configSQL3 = {
    client: 'sqlite3', 
    connection: {
      filename: `${direccionDeArchivoAGuardar}/ecommerce.sqlite`
    }
}

module.exports = configSQL3;