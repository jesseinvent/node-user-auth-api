import jwt from "jsonwebtoken"
import sendSuccessApiResponse from "../sendSuccessApiResponse.js"

export default (res, user) => {
    const token = jwt.sign({ id:user._id, email: user.email }, process.env.JWT_SECRET, {
                        expiresIn: process.env.OTP_TIME_EXPIRY_MINUTES,
                        issuer: `${user.first_name}-${user.last_name}`
                })
                
    return sendSuccessApiResponse(res, {
        statusCode: 200,
        message: ["Successfully logged in 😀"],
        data: {
            access_token: token,
            type: 'Bearer',
            user
        }
    })
}