import { assert } from "chai";
import { beforeEach } from "mocha";
import UserModel from "../../../src/models/User.js";
import UserData from "../../helpers/appData/UserAuthData.js";

describe("Users Authentication test", () => {
  beforeEach((done) => {
    UserModel.deleteMany({}, () => done());
  });

  it("Tests a user can't signup with invalid email", async () => {
    const user = new UserData();

    const response = await user.signUpWithInvalidEmail();

    assert.equal(response.statusCode, 400);
    assert.isObject(response.body);
    assert.equal(response.body.status, "fail");
  });

  it("Tests a user can't signup with two unmatched passwords", async () => {
    const user = new UserData();

    const response = await user.signUpWithUnMatchedPasswords();

    assert.equal(response.statusCode, 400);
    assert.isObject(response.body);
    assert.equal(response.body.status, "fail");
  });

  it("Tests a user can't signup without providing first name", async () => {
    const user = new UserData();

    const response = await user.signUpWithOutFirstName();

    assert.equal(response.statusCode, 400);
    assert.isObject(response.body);
    assert.equal(response.body.status, "fail");
  });

  it("Tests a user can't signup without providing last name", async () => {
    const user = new UserData();

    const response = await user.signUpWithOutLastName();

    assert.equal(response.statusCode, 400);
    assert.isObject(response.body);
    assert.equal(response.body.status, "fail");
  });

  it("Tests a user can signup providing all required fields", async () => {
    const user = new UserData();

    const response = await user.signUpWithValidDetails();

    assert.equal(response.statusCode, 201);
    assert.isObject(response.body);
    assert.equal(response.body.status, "success");
  });

  it("Tests a user can't signup without providing phone number", async () => {
    const user = new UserData();

    const response = await user.signUpWithOutPhoneNumber();

    assert.equal(response.statusCode, 400);
    assert.isObject(response.body);
    assert.equal(response.body.status, "fail");
  });

  it("Tests a user can only register once", async () => {
    const user = new UserData();

    await user.signUpWithValidDetails();
    const response = await user.signUpWithValidDetails();

    // console.log(response.body);

    assert.equal(response.statusCode, 400);
    assert.isObject(response.body);
    assert.equal(response.body.status, "fail");
    assert.exists(response.body.message);
  });

  it("Tests an otp can be resent to user", async () => {
    const user = new UserData();

    await user.signUpWithValidDetails();
    const response = await user.resendOtpToUser();

    // assert.equal((await UserModel.countDocuments()), 1)

    assert.equal(response.statusCode, 200);
    assert.isObject(response.body);
    assert.equal(response.body.status, "success");
  });

  it("Tests user can't verify account with wrong OTP", async () => {
    const user = new UserData();

    await user.signUpWithValidDetails();
    const response = await user.verifyUserWithOtp();

    // assert.equal((await UserModel.countDocuments()), 1)

    assert.equal(response.statusCode, 401);
    assert.isObject(response.body);
    assert.equal(response.body.status, "fail");
  });

  it("Tests user can't reset account with wrong OTP", async () => {
    const user = new UserData();

    await user.signUpWithValidDetails();
    const response = await user.verifyUserWithOtp();

    // assert.equal((await UserModel.countDocuments()), 1)

    assert.equal(response.statusCode, 401);
    assert.isObject(response.body);
    assert.equal(response.body.status, "fail");
  });

  it("Tests user can't request for password reset with wrong email", async () => {
    const user = new UserData();

    await user.signUpWithValidDetails();
    const response = await user.forgotPasswordRequestWithWrongEmail();

    // assert.equal((await UserModel.countDocuments()), 1)

    assert.equal(response.statusCode, 401);
    assert.isObject(response.body);
    assert.equal(response.body.status, "fail");
  });

  it("Tests user can request for password reset with valid email", async () => {
    const user = new UserData();

    await user.signUpWithValidDetails();
    const response = await user.forgotPasswordRequestWithValidEmail();

    // assert.equal((await UserModel.countDocuments()), 1)

    assert.equal(response.statusCode, 200);
    assert.isObject(response.body);
    assert.equal(response.body.status, "success");
  });

  it("Tests a user can't reset password with invalid email", async () => {
    const user = new UserData();

    await user.signUpWithValidDetails();
    await user.forgotPasswordRequestWithValidEmail();
    const response = await user.resetPasswordWithInvalidEmailRequest();

    // assert.equal((await UserModel.countDocuments()), 1)

    assert.equal(response.statusCode, 401);
    assert.isObject(response.body);
    assert.equal(response.body.status, "fail");
  });

  it("Tests a user can't reset password without otp", async () => {
    const user = new UserData();

    await user.signUpWithValidDetails();
    await user.forgotPasswordRequestWithValidEmail();
    const response = await user.resetPasswordWithOutOtpRequest();

    // assert.equal((await UserModel.countDocuments()), 1)

    assert.equal(response.statusCode, 400);
    assert.isObject(response.body);
    assert.equal(response.body.status, "fail");
  });

  it("Tests a user can't reset password without unmatched passwords", async () => {
    const user = new UserData();

    await user.signUpWithValidDetails();
    await user.forgotPasswordRequestWithValidEmail();
    const response = await user.resetPasswordWithUnMatchedPasswordsRequest();

    // assert.equal((await UserModel.countDocuments()), 1)

    assert.equal(response.statusCode, 400);
    assert.isObject(response.body);
    assert.equal(response.body.status, "fail");
  });

  it("Tests a user can't reset password with wrong otp", async () => {
    const user = new UserData();

    await user.signUpWithValidDetails();
    await user.forgotPasswordRequestWithValidEmail();
    const response = await user.resetPasswordWithWrongOtpRequest();

    // assert.equal((await UserModel.countDocuments()), 1)

    assert.equal(response.statusCode, 401);
    assert.isObject(response.body);
    assert.equal(response.body.status, "fail");
  });

  it("Tests a user can't login without without username and password", async () => {
    const user = new UserData();

    await user.signUpWithValidDetails();
    const response = await user.loginWithOutUsernameAndPassword();

    assert.equal(response.statusCode, 400);
    assert.isObject(response.body);
    assert.equal(response.body.status, "fail");
  });

  it("Tests a user can't login with wrong password", async () => {
    const user = new UserData();

    await user.signUpWithValidDetails();
    const response = await user.loginWithWrongPassword();

    assert.equal(response.statusCode, 400);
    assert.isObject(response.body);
    assert.equal(response.body.status, "fail");
  });

  it("Tests a user can't login without being active", async () => {
    const user = new UserData();

    await user.signUpWithValidDetails();
    const response = await user.loginWithValidDetails();

    assert.equal(response.statusCode, 401);
    assert.isObject(response.body);
    assert.equal(response.body.status, "fail");
  });

  it("Tests an active user can login with valid details", async () => {
    const user = new UserData();

    await user.signUpWithValidDetails();
    await user.makeActive();
    const response = await user.loginWithValidDetails();

    assert.equal(response.statusCode, 200);
    assert.isObject(response.body);
    assert.equal(response.body.status, "success");
    assert.exists(response.body.data.access_token);
    assert.exists(response.body.data.user);
  });
});
