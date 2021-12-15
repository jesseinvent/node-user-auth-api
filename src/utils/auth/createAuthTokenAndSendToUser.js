import jwt from "jsonwebtoken";
import { configs } from "../../config/configs.js";
import sendSuccessApiResponse from "../responses/sendSuccessApiResponse.js";

export default (res, user) => {
  const token = jwt.sign(
    { id: user._id, email: user.email },
    configs.JWT_SECRET,
    {
      expiresIn: configs.OTP_TIME_EXPIRY_MINUTES,
      issuer: `${user.first_name}-${user.last_name}`,
    }
  );

  return sendSuccessApiResponse(res, {
    statusCode: 200,
    message: ["Successfully logged in 😀"],
    data: {
      access_token: token,
      type: "Bearer",
      user,
    },
  });
};
