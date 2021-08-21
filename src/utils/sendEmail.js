import mailgun from 'mailgun-js'

export default async (data = {email, message, subject}) => {

    const API_KEY = process.env.MAILGUN_API_KEY
    const DOMAIN = process.env.MAILGUN_DOMAIN_NAME

    const mailClient = mailgun({apiKey: API_KEY, domain: DOMAIN})

    const emailData = {
        from: `AuthApi <no-reply@${DOMAIN}>`,
        to: data.email,
        subject: data.subject,
        text: data.message
    };
    
    mailClient.messages().send(emailData, (error, body) => {
        console.log(error, body);
    });
  
}

