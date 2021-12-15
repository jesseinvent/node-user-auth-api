import mongoose from "mongoose";
import logger from "../utils/logger.js";
import { configs } from "./configs.js";

function getDatabaseURL(environment) {
  switch (environment) {
    case "production":
      return configs.DB_PRODUCTION_URL;
    case "development":
      return configs.DB_DEV_URL;
    case "test":
      return configs.DB_TEST_URL;
    default:
      return configs.DB_DEV_URL;
  }
}

export default () => {
  const databaseUrl = getDatabaseURL(configs.NODE_ENV);

  try {
    mongoose
      .connect(databaseUrl, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useCreateIndex: true,
        useFindAndModify: false,
      })
      .then(() => {
        logger.info("Connected to DB 😊");
      })
      .catch((err) => {
        logger.error(`${err.name}: ${err.message}`);
      });
  } catch (error) {
    logger.error(`${err.name}: ${err.message}`);
  }
};
