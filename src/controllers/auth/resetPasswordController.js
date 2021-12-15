import asyncHandler from "../../utils/asyncHandler.js";
import UserModel from "../../models/User.js";
import checkIfOtpIsValidAndHasNotExpired from "../../utils/auth/checkIfOtpIsValidAndHasNotExpired.js";
import { validationResult } from "express-validator";
import sendSuccessApiResponse from "../../utils/responses/sendSuccessApiResponse.js";
import getErrorMessagesFromArray from "../../helpers/getErrorMessagesFromArray.js";
import {
  sendInvalidOtpError,
  sendRequestCouldNotBeCompletedError,
  sendUserAccountNotAvailableError,
} from "../../helpers/commonAppErrors.js";
import { AppError } from "../../utils/error/AppError.js";

export default asyncHandler(async (req, res, next) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    const errorMessages = getErrorMessagesFromArray(errors.array());
    next(new AppError(400, errorMessages));
  }

  const { email, otp, password } = req.body;

  const user = await UserModel.findOne({ email, active: true });

  if (!user) {
    next(sendUserAccountNotAvailableError(res));
  }

  if (user.otp === undefined || user.otp_time_expiry === undefined) {
    next(sendInvalidOtpError(res));
  }

  const otpIsValid = await checkIfOtpIsValidAndHasNotExpired(
    otp,
    user.otp,
    user.otp_time_expiry
  );

  if (!otpIsValid) {
    next(sendInvalidOtpError(res));
  }

  user.password = password;
  user.otp = undefined;
  user.otp_time_expiry = undefined;

  if (!(await user.save())) {
    next(sendRequestCouldNotBeCompletedError(res));
  }

  // send password successfully reset email

  return sendSuccessApiResponse(res, {
    statusCode: 200,
    message: [
      "Password reset successful! 😀 Proceed to login with your new password",
    ],
    data: {},
  });
});
