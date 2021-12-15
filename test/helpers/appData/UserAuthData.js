import User from "../../../src/models/User.js";
import { makePatchApiRequest, makePostApiRequest } from "../apiRequests.js";

class UserAuthData {
  email = "jcinvent@gmail.com";
  password = "12345789";
  confirm_password = "12345789";
  phone_number = "09085581247";
  first_name = "John";
  last_name = "Doe";
  otp = "wrongOtp";

  signupUri = "/api/v1/auth/signup";
  resendOtpUri = "/api/v1/auth/resend_otp";
  verifyUserUri = "/api/v1/auth/verify";
  forgotPasswordUri = "/api/v1/auth/forgot_password";
  resetPasswordUri = "/api/v1/auth/reset_password";
  loginUri = "/api/v1/auth/login";

  getUser = () => {
    return {
      email: this.email,
      password: this.password,
      phone_number: this.phone_number,
      confirm_password: this.confirm_password,
      phone_number: this.phone_number,
      first_name: this.first_name,
      last_name: this.last_name,
    };
  };

  getUserWithInvalidEmail = () => {
    return {
      email: "john@gmail",
      password: this.password,
      phone_number: this.phone_number,
      confirm_password: this.confirm_password,
      first_name: this.first_name,
      last_name: this.last_name,
    };
  };

  getUserWithUnMatchedPasswords = () => {
    return {
      email: this.email,
      password: this.password,
      phone_number: this.phone_number,
      confirm_password: "12345",
      first_name: this.first_name,
      last_name: this.last_name,
    };
  };

  getUserWithOutFirstName = () => {
    return {
      email: this.email,
      password: this.password,
      phone_number: this.phone_number,
      confirm_password: this.confirm_password,
      first_name: "",
      last_name: this.last_name,
    };
  };

  getUserWithOutLastName = () => {
    return {
      email: this.email,
      password: this.password,
      phone_number: this.phone_number,
      confirm_password: this.confirm_password,
      first_name: this.first_name,
      last_name: "",
    };
  };

  getUserWithOutPhoneNumber = () => {
    return {
      email: this.email,
      password: this.password,
      // phone_number: '',
      confirm_password: this.confirm_password,
      first_name: this.first_name,
      last_name: this.last_name,
    };
  };

  /******************** ACTIONS *************************** */

  signUpWithInvalidEmail = async () => {
    const response = await makePostApiRequest(
      this.signupUri,
      this.getUserWithInvalidEmail()
    );

    return response;
  };

  signUpWithUnMatchedPasswords = async () => {
    const response = await makePostApiRequest(
      this.signupUri,
      this.getUserWithUnMatchedPasswords()
    );

    return response;
  };

  signUpWithOutFirstName = async () => {
    const response = await makePostApiRequest(
      this.signupUri,
      this.getUserWithOutFirstName()
    );

    return response;
  };

  signUpWithOutLastName = async () => {
    const response = await makePostApiRequest(
      this.signupUri,
      this.getUserWithOutLastName()
    );

    return response;
  };

  signUpWithOutPhoneNumber = async () => {
    const response = await makePostApiRequest(
      this.signupUri,
      this.getUserWithOutPhoneNumber()
    );

    return response;
  };

  signUpWithValidDetails = async () => {
    const response = await makePostApiRequest(this.signupUri, this.getUser());

    return response;
  };

  resendOtpToUser = async () => {
    const response = await makePatchApiRequest(this.resendOtpUri, {
      email: this.email,
    });

    return response;
  };

  verifyUserWithOtp = async () => {
    const response = await makePostApiRequest(this.verifyUserUri, {
      email: this.email,
      otp: this.otp,
    });

    return response;
  };

  forgotPasswordRequestWithValidEmail = async () => {
    const response = await makePostApiRequest(this.forgotPasswordUri, {
      email: this.email,
    });

    return response;
  };

  forgotPasswordRequestWithWrongEmail = async () => {
    const response = await makePostApiRequest(this.forgotPasswordUri, {
      email: "wrongEmail",
    });

    return response;
  };

  resetPasswordWithInvalidEmailRequest = async () => {
    const response = await makePatchApiRequest(this.resetPasswordUri, {
      email: "wrongEmail",
      password: "newPassword",
      confirm_password: "newPassword",
      otp: "12345",
    });

    return response;
  };

  resetPasswordWithOutOtpRequest = async () => {
    const response = await makePatchApiRequest(this.resetPasswordUri, {
      email: "wrongEmail",
      password: "newPassword",
      confirm_password: "newPassword",
    });

    return response;
  };

  resetPasswordWithUnMatchedPasswordsRequest = async () => {
    const response = await makePatchApiRequest(this.resetPasswordUri, {
      email: this.email,
      password: "newPassword",
      confirm_password: "wrongPassword",
      otp: "12345",
    });

    return response;
  };

  resetPasswordWithWrongOtpRequest = async () => {
    const response = await makePatchApiRequest(this.resetPasswordUri, {
      email: this.email,
      password: "newPassword",
      confirm_password: "newPassword",
      otp: "12345",
    });

    return response;
  };

  loginWithOutUsernameAndPassword = async () => {
    const response = await makePostApiRequest(this.loginUri);

    return response;
  };

  loginWithWrongPassword = async () => {
    const response = await makePostApiRequest(this.loginUri, {
      email: this.email,
      password: "wrongPassword",
    });

    return response;
  };

  loginWithValidDetails = async () => {
    const response = await makePostApiRequest(this.loginUri, {
      email: this.email,
      password: this.password,
    });

    return response;
  };

  makeActive = async () => {
    await User.findOneAndUpdate(
      {
        email: this.email,
      },
      {
        active: true,
      }
    );

    return true;
  };
}

export default UserAuthData;
