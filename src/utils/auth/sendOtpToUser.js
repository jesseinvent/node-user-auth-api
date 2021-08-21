import fs from 'fs'
import path from 'path'
import sendEmail from '../sendEmail.js'

export default async (email, name, otp, type = "newUser") => {

    let message
    let subject

    if(type === "resend") {
        subject = 'Resent OTP for account verfication'

        message = `Hi ${name}! Sorry for what happened the last time, here is your new otp "${otp}", expires in ${process.env.OTP_TIME_EXPIRY_MINUTES} minutes, if you didn't initiate this request, please ignore 🙂`
    }

    if(type === "passwordReset") {
        subject = 'Password Reset'
        message = `Hey ${name}! Your otp for resetting your password is "${otp}", expires in ${process.env.OTP_TIME_EXPIRY_MINUTES} minutes, if you didn't initiate this request, please ignore 🙂`
        
    } else {

        subject = 'Verify Your Account'

        message = `Hi ${name}! Please use this code to verify your account "${otp}", expires in ${process.env.OTP_TIME_EXPIRY_MINUTES} minutes 🙂`

    }

    if (process.env.NODE_ENV === "production") {
        await sendEmail({ email, message, subject })
    }

    else if (process.env.NODE_ENV === "development") {

        const appDir =  path.resolve()
        const fileName = `${appDir}/otps/${email}_otp.txt`

        fs.writeFile(fileName, message, err => {
            if(err) console.error(err);
        })
    }
    
} 