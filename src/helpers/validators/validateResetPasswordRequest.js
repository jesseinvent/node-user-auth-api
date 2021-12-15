import { body } from "express-validator";

export default [
  body("email").exists().withMessage("Please provide username 😔"),

  body("password")
    .isLength({ min: 8, max: 20 })
    .withMessage(
      "Please provide a valid password not less than 7 digits long 😉"
    )
    .custom((value, { req }) => value === req.body.confirm_password)
    .withMessage("Passwords do not match 😞"),

  body("confirm_password")
    .exists()
    .withMessage("Confirm password field not present 😞"),

  body("otp").exists().withMessage("Please provide OTP"),
];
