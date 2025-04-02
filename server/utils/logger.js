const { createLogger, transports, format } = require("winston");

const logger = createLogger({
  level: "info",
  transports: [
    new transports.Console({ format: format.simple() }),
    new transports.File({
      level: "error",
      filename: `logs/${new Date().toLocaleDateString().replace(/\//g, ".")}.log`,
      format: format.combine(format.timestamp({format:new Date().toLocaleString()}), format.json()),
    }),
  ],
});

module.exports = logger;
