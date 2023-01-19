const winston = require("winston");

const { createLogger, format, transports } = winston;
const { combine, printf, timestamp, colorize } = format;

/* logger.silly('Imprimimos Silly');
logger.debug('Imprimimos Debug');
logger.verbose('Imprimimos Verbose');
logger.info('Imprimimos Info');
logger.warn('Imprimimos Warn');
logger.error('Imprimimos Error'); */

const logConfiguration = {
    level: "silly",
    format: combine(
        timestamp({
            format: "MMM-DD-YYYY HH:mm:ss",
        }),
        colorize(),
        printf((info) => `${info.level} | ${[info.timestamp]} | ${info.message}`),
    ),
    transports: [ 
        new winston.transports.Console(),
        new winston.transports.File({
            filename: "./warn.log",
            level: "warn",
        }),
        new winston.transports.File({
            filename: "./error.log",
            level: "error",
        }),
    ],
};

let logger;

const getLogers = () =>{
    if (!logger) {
        logger = winston.createLogger(logConfiguration);
    }
    return logger
}

module.exports = getLogers;
