import asyncHandler from "../../utils/asyncHandler.js"
import UserModel from "../../models/User.js"
import { AppError } from "../../utils/AppError.js"
import sendOtpToUser from "../../utils/auth/sendOtpToUser.js"
import sendSuccessApiResponse from "../../utils/sendSuccessApiResponse.js"
import { sendProvideUsernameError, sendRequestCouldNotBeCompletedError, sendUserAccountNotAvailableError } from "../../helpers/commonAppErrors.js"

export default asyncHandler(async (req, res, next) => {
    
    const { email } = req.body

    if(!email) {
      next(
        sendProvideUsernameError(res)
      )
    }

    const user = await UserModel.findOne({ email })

    if(!user) {
        next(
            sendUserAccountNotAvailableError(res)
        )
    }

    const userOtp = await user.generateOtp()
   
   if(!await user.save()) {
        next(
            sendRequestCouldNotBeCompletedError(res)
        )
   }

    await sendOtpToUser(email, user.first_name, userOtp, "passwordReset")

    return sendSuccessApiResponse(res, {
        statusCode: 200,
        message: ["Password reset OTP successfully sent 😀"],
        data: {}
    })

})