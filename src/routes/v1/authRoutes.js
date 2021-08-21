import { Router } from "express"
import signup from "../../controllers/auth/signupController.js"
import validateNewUserRegistration from "../../helpers/validators/validateNewUserRegistration.js"
import resendOtpController from "../../controllers/auth/resendOtpController.js"
import verifyAccountController from "../../controllers/auth/verifyAccountController.js"
import forgotPasswordController from "../../controllers/auth/forgotPasswordController.js"
import resetPasswordController from "../../controllers/auth/resetPasswordController.js"
import loginController from "../../controllers/auth/loginController.js"
import validateResetPasswordRequest from "../../helpers/validators/validateResetPasswordRequest.js"

const router = Router()

/** /api/v1/auth/ */
router.get('/', (req, res) => {
    return res.json( { message: "User routes" } )   
})


/** POST /api/v1/auth/signup */
router.post('/signup', validateNewUserRegistration, signup)

/** PATCH /api/v1/auth/resend_otp */
router.patch('/resend_otp', resendOtpController)

/** PATCH /api/v1/auth/verify */
router.post('/verify', verifyAccountController)

/** POST /api/v1/auth/forgot_password */
router.post('/forgot_password', forgotPasswordController )

/** PATCH /api/v1/auth/reset_password */
router.patch('/reset_password', validateResetPasswordRequest, resetPasswordController)

/** POST /api/v1/auth/login */
router.post('/login', loginController)

/** PATCH /api/v1/auth/login */
// router.post('/refresh', refrestTokenController)

export default router