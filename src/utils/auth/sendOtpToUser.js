import fs from "fs";
import path from "path";
import { configs } from "../../config/configs.js";
import { sendEmail } from "../../services/emailService.js";
import logger from "../logger.js";

export default async (email, name, otp, type = "newUser") => {
  let message;
  let subject;

  if (type === "resend") {
    subject = "Resent OTP for account verfication";

    message = `Hi ${name}! Sorry for what happened the last time, here is your new otp "${otp}", expires in ${configs.OTP_TIME_EXPIRY_MINUTES} minutes, if you didn't initiate this request, please ignore 🙂`;
  }

  if (type === "passwordReset") {
    subject = "Password Reset";
    message = `Hey ${name}! Your otp for resetting your password is "${otp}", expires in ${configs.OTP_TIME_EXPIRY_MINUTES} minutes, if you didn't initiate this request, please ignore 🙂`;
  } else {
    subject = "Verify Your Account";

    message = `Hi ${name}! Please use this code to verify your account "${otp}", expires in ${configs.OTP_TIME_EXPIRY_MINUTES} minutes 🙂`;
  }

  if (configs.NODE_ENV === "production") {
    await sendEmail({ email, message, subject });
  } else if (configs.NODE_ENV === "development") {
    logger.info(`OTP <${email}>: ${otp}`);
  }
};
