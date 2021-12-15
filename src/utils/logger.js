import winston from "winston";

const commonAppTransport = new winston.transports.Console({
  format: winston.format.combine(
    winston.format.colorize(),
    winston.format.simple()
  ),
});

const logger = winston.createLogger({
  transports: [commonAppTransport],
});

export default logger;
