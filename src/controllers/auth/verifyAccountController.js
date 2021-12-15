import {
  sendInvalidOtpError,
  sendProvideUsernameAndOtpError,
  sendUserAccountNotAvailableError,
} from "../../helpers/commonAppErrors.js";
import UserModel from "../../models/User.js";
import asyncHandler from "../../utils/asyncHandler.js";
import createAuthTokenAndSendToUser from "../../utils/auth/createAuthTokenAndSendToUser.js";
import checkIfOtpIsValidAndHasNotExpired from "../../utils/auth/checkIfOtpIsValidAndHasNotExpired.js";
import { AppError } from "../../utils/error/AppError.js";

export default asyncHandler(async (req, res, next) => {
  const { email, otp } = req.body;

  if (!email || !otp) {
    next(sendProvideUsernameAndOtpError(res));
  }

  const user = await UserModel.findOne({ email });

  if (!user) {
    next(sendUserAccountNotAvailableError(res));
  }

  if (user.active) {
    throw new AppError(422, "Account already verified 🙂");
  }

  const otpIsValid = await checkIfOtpIsValidAndHasNotExpired(
    otp,
    user.otp,
    user.otp_time_expiry
  );

  if (!otpIsValid) {
    next(sendInvalidOtpError(res));
  }

  await UserModel.findByIdAndUpdate(user._id, {
    active: true,
    otp: undefined,
    otp_time_expiry: undefined,
  });

  return createAuthTokenAndSendToUser(res, user);
});
