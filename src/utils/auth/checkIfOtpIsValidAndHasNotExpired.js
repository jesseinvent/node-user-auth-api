import checkIfOtpHasExpired from "../../helpers/checkIfOtpHasExpired.js";
import { compareString } from "./hash.js";

export default async (otp, dbOtp, otpExpiryTime) => {

    const otpMatches = await compareString(otp, dbOtp)
    const hasExpired = checkIfOtpHasExpired(otpExpiryTime)

    if (otpMatches && !hasExpired) {
        return true
    }

    return false
}