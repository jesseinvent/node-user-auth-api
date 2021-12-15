import http from "http";
import app from "./app.js";
import getServerPort from "./utils/getServerPort.js";
import logger from "./utils/logger.js";

const server = http.createServer(app);

const port = getServerPort();

server.listen(port, () =>
  logger.info(`Server running on port http://127.0.0.1:${port} 😁`)
);

process.on("uncaughtException", (err) => {
  logger.error("An Uncaught error occured");
  logger.error(`${err.name}:  ${err.message}`);
  process.exit(1);
});
