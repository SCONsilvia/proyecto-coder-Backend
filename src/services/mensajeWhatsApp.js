const twilio = require("twilio");

const twilioClient = twilio(process.env.SID, process.env.TOKEN);

module.exports = { twilioClient };
