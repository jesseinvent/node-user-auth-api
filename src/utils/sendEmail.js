import mailgun from "mailgun-js";
import { configs } from "../config/configs.js";
import logger from "./logger.js";

export default async (data = { email, message, subject }) => {
  const API_KEY = configs.MAILGUN_API_KEY;
  const DOMAIN = configs.MAILGUN_DOMAIN_NAME;

  const mailClient = mailgun({ apiKey: API_KEY, domain: DOMAIN });

  const emailData = {
    from: `AuthApi <no-reply@${DOMAIN}>`,
    to: data.email,
    subject: data.subject,
    text: data.message,
  };

  mailClient.messages().send(emailData, (error, body) => {
    logger.info(error, body);
  });
};
