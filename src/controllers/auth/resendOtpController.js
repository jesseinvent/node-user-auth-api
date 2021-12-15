import {
  sendProvideEmailError,
  sendRequestCouldNotBeCompletedError,
  sendUserAccountNotAvailableError,
} from "../../helpers/commonAppErrors.js";
import User from "../../models/User.js";
import asyncHandler from "../../utils/asyncHandler.js";
import sendOtpToUser from "../../utils/auth/sendOtpToUser.js";
import sendSuccessApiResponse from "../../utils/responses/sendSuccessApiResponse.js";

export default asyncHandler(async (req, res, next) => {
  const { email } = req.body;

  if (!email) {
    next(sendProvideEmailError(res));
  }

  const user = await User.findOne({ email });

  if (!user) {
    next(sendUserAccountNotAvailableError(res));
  }

  const otp = await user.generateOtp();

  if (!(await user.save())) {
    next(sendRequestCouldNotBeCompletedError(res));
  }

  await sendOtpToUser(email, user.first_name, otp, "resend");

  return sendSuccessApiResponse(res, {
    statusCode: 200,
    message: ["OTP successfully resent 😀"],
    data: {},
  });
});
