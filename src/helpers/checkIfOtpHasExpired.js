
export default (otpExpiryTime) => {
      
    const now = Date.now();
    const otpDate = new Date(otpExpiryTime).getTime()

    if (otpDate < now) {
        return true
    }

    return false
}