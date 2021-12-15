import dotenv from "dotenv";

dotenv.config();

export const configs = {
  NODE_ENV: process.env.NODE_ENV,
  PORT: process.env.PORT || 5000,
  DB_TEST_URL: process.env.DB_TEST_URL || "",
  DB_DEV_URL: process.env.DB_DEV_URL || "",
  DB_PRODDUCTION_URL: process.env.DB_PRODDUCTION_URL || "",
  OTP_TIME_EXPIRY_MINUTES: process.env.OTP_TIME_EXPIRY_MINUTES || "",
  JWT_SECRET: process.env.JWT_SECRET || "secret",
  MAILGUN_API_KEY: process.env.MAILGUN_API_KEY || "",
  MAILGUN_DOMAIN_NAME: process.env.MAILGUN_DOMAIN_NAME || "",
};
