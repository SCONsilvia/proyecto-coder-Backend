//encriptacion
const bcrypt = require("bcryptjs");
const encryptPassword = async password => {
    const salt = await bcrypt.genSalt(10)
    return await bcrypt.hash(password, salt);
}

const matchPassword = async (password, passwordBD) => {
    return await bcrypt.compare(password, passwordBD)
}  
//

module.exports = {encryptPassword,matchPassword}