# A User Signup, verification and authentication API

Includes all features for user signup and verfication, following the Test Driven Development approach.

## Features includes:
- New user signup
- User verification with OTP
- Forgot password
- Account verification with OTP
- Resend OTP
- Password reset
- User Login

## Setting up the API
- Clone the repository
```
$ git clone https://github.com/jesseinvent/nodeUserAuthApi

 ```

 - Install all dependencies
 ```
 $ npm install
 ```

 - Copy .env.local file to .env
 ```
 cp .env.local .env
 ```

- Create mongodb databases for development and testing environments
- Include database URLs in .env file accordingly
- Enter other .env credentials
- Run application tests
```
$ npm run test
```

> Note: 
- Emails will only be sent when API is running in a production environment.
- In a development environment, otps will be saved in an otps folder in the root directory.

## Enjoy 😃