import asyncHandler from "../../utils/asyncHandler.js"
import User from "../../models/User.js";
import createAuthTokenAndSendToUser from "../../utils/auth/createAuthTokenAndSendToUser.js";
import { sendInvalidLoginCredentialsError,
        sendProvideUsernameAndPasswordError,
        sendUserAccountNotActiveError
     } from "../../helpers/commonAppErrors.js";

export default asyncHandler( async (req, res, next) => {
    
    const { email, password } = req.body;

    if(!email || !password) {
      next (
        sendProvideUsernameAndPasswordError(res)
      ) 
    }

    const user = await User.findOne({ email }).select('+password')

    if(!user || !(await user.isValidPassword(password, user.password))) {
        return sendInvalidLoginCredentialsError(res)
    }

    if (user.active !== true) {
        next(
            sendUserAccountNotActiveError(res)
        ) 
    }

    return createAuthTokenAndSendToUser(res, user)    
}) 