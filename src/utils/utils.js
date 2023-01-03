// encriptacion
const bcrypt = require("bcryptjs");

const encryptPassword = async (password) => {
    const salt = await bcrypt.genSalt(10);
    return bcrypt.hash(password, salt);
};

const matchPassword = async (password, passwordBD) => bcrypt.compare(password, passwordBD);
//

module.exports = { encryptPassword, matchPassword };
