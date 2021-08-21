import { Router } from "express"
import authRoutes from "./authRoutes.js"
import sendSuccessApiResponse from "../../utils/sendSuccessApiResponse.js"
const router = Router()

/** /api/v1/ */
router.get('/', (req, res) => {
    return sendSuccessApiResponse(res, { 
        statusCode: 200,
        message: 'Welcome to User auth API 😊',
        data: {} 
    })
})

/** /api/v1/auth/ */
router.use('/auth', authRoutes)

export default router