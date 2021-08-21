import sendErrorApiResponse from "./sendErrorApiResponse.js"
export class AppError extends Error {
 
    constructor(appResponseObject, statusCode, message) {
        const status = `${statusCode}`.startsWith('4') ? "fail" : "error"
        return sendErrorApiResponse(appResponseObject, { status, statusCode, message })
    }
   
}


