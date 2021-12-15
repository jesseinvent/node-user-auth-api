import asyncHandler from "../../utils/asyncHandler.js";
import sendSuccessApiResponse from "../../utils/responses/sendSuccessApiResponse.js";
import { validationResult } from "express-validator";
import createOneFactory from "../../utils/factory/createOneFactoryHandler.js";
import User from "../../models/User.js";
import sendOtpToUser from "../../utils/auth/sendOtpToUser.js";
import getErrorMessagesFromArray from "../../helpers/getErrorMessagesFromArray.js";
import { sendRequestCouldNotBeCompletedError } from "../../helpers/commonAppErrors.js";
import { AppError } from "../../utils/error/AppError.js";

export default asyncHandler(async (req, res, next) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    const errorMessages = getErrorMessagesFromArray(errors.array());
    next(new AppError(400, errorMessages));
  }

  const findUser = await User.findOne({ email: req.body.email });

  if (findUser) {
    next(new AppError(400, ["User already exists 🙁"]));
  }

  const user = await createOneFactory(User, {
    first_name: req.body.first_name,
    last_name: req.body.last_name,
    phone_number: req.body.phone_number,
    email: req.body.email,
    password: req.body.password,
  });

  // Generate user OTP from user model
  const userOtp = await user.generateOtp();

  if (!(await user.save())) {
    next(sendRequestCouldNotBeCompletedError(res));
  }

  // send otp to user
  await sendOtpToUser(req.body.email, req.body.first_name, userOtp);

  return sendSuccessApiResponse(res, {
    statusCode: 201,
    message: ["Account creation successful, verification OTP sent 😀"],
    data: {},
  });
});
