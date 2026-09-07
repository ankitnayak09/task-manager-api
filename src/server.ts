import createApp from "./app.js";
import config from "./config/env.js";
import logger from "./middlewares/logger.js";

const server = createApp();

server.listen(config.PORT, () =>
  logger.info("Server is listening on http://localhost:" + config.PORT),
);

process.on("uncaughtException", (err) => {
  logger.fatal(`UNCAUGHT EXCEPTION - shutting down ${err}`);
  process.exit(1);
});

process.on("unhandledRejection", (reason) => {
  logger.fatal(`UNHANDLED REJECTION, ${reason}`);
  process.exit(1);
});
