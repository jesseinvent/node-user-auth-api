import { assert } from "chai";
import generateDigitsOTP from "../../src/utils/auth/generateOTP.js";
import { hashString, compareString } from "../../src/utils/auth/hash.js";
// import asyncHandler from '../../src/utils/asyncHandler.js'

describe("Application Utilities tests", () => {
  it("Tests that the hash function returns a hashed string", async () => {
    const string = "123456789";
    const hashedString = await hashString(string);

    assert.isString(hashedString);
    assert.notEqual(string, hashedString);
  });

  it("Tests the hash function to make sure the string matches the original string when compared", async () => {
    const string = "123456789";
    const hashedString = await hashString(string);
    const compareResult = await compareString(string, hashedString);

    assert.isTrue(compareResult);
  });

  it("Tests the OTP is generated according to the length supplied", () => {
    const otp = generateDigitsOTP(8);
    assert.equal(otp.length, 8);
  });
});

// otp generator
