import mongoose from "mongoose";
import { configs } from "../../src/config/configs.js";
import logger from "../../src/utils/logger.js";

export default () => {
  mongoose
    .connect(configs.DB_TEST_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
    .then(() => {
      logger.info("Connected to test DB");
    })
    .catch((err) => {
      logger.error(err.name, err.message);
    });
};
