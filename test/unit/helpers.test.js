import { assert } from "chai";
import checkIfOtpHasExpired from "../../src/helpers/checkIfOtpHasExpired.js";
import getErrorMessagesFromArray from "../../src/helpers/getErrorMessagesFromArray.js";

describe("Application helpers test", () => {
  it("Tests that otpHasExpired function returns true on a passed time", () => {
    const time = Date.now() - 200;
    const result = checkIfOtpHasExpired(time);

    assert.isTrue(result);
  });

  it("Tests that otpHasExpired function returns false on a future time", () => {
    const time = Date.now() + 200;
    const result = checkIfOtpHasExpired(time);

    assert.isFalse(result);
  });

  it("Tests the getErrorMessagesFromArray returns an array of messages", () => {
    const obj = [
      {
        param: "email",
        msg: "email field is required",
      },
      {
        param: "password",
        msg: "password field is required",
      },
      {
        param: "confirm_password",
        msg: "passwords do not match",
      },
    ];

    const messages = getErrorMessagesFromArray(obj);

    assert.isArray(messages);
  });
});
