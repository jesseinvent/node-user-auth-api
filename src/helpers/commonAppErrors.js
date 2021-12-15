import { AppError } from "../utils/error/AppError.js";

export const sendProvideUsernameError = (res) => {
  throw new AppError(422, ["Please provide username 🙂"]);
};

export const sendProvideEmailError = (res) => {
  throw new AppError(422, ["Please provide user's email 🙂"]);
};

export const sendProvideUsernameAndPasswordError = (res) => {
  throw new AppError(400, ["Please provide username and password 😞"]);
};

export const sendProvideUsernameAndOtpError = (res) => {
  throw new AppError(422, ["Please provide username and OTP 🙂"]);
};

export const sendUserAccountNotAvailableError = (res) => {
  throw new AppError(401, [
    "You don't have an account on this platform 🙂, please proceed to signup",
  ]);
};

export const sendInvalidOtpError = (res) => {
  throw new AppError(401, ["Invalid OTP or OTP has expired 😔"]);
};

export const sendInvalidLoginCredentialsError = (res) => {
  throw new AppError(400, ["Invalid login credentials 🙂"]);
};

export const sendUserAccountNotActiveError = (res) => {
  throw new AppError(401, [
    "Hello! please proceed to activate your account or contact admin for assistance 🙂",
  ]);
};

export const sendRequestCouldNotBeCompletedError = (res) => {
  throw new AppError(400, [
    "Request could not be completed 😔, please try again!",
  ]);
};
