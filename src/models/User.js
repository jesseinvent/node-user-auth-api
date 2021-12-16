import mongoose from "mongoose";
import { configs } from "../config/configs.js";
import generateOtp from "../utils/auth/generateOTP.js";
import { compareString, hashString } from "../utils/auth/hash.js";

const { model, Schema } = mongoose;

const userSchema = new Schema(
  {
    first_name: {
      type: String,
      required: true,
    },

    last_name: {
      type: String,
      required: true,
    },

    email: {
      type: String,
      required: true,
    },

    phone_number: {
      type: String,
      required: true,
    },

    password: {
      type: String,
      required: true,
    },

    verification_token: {
      type: String,
    },

    active: {
      type: Boolean,
      default: false,
    },
    otp: String,
    otp_time_expiry: Date,
  },
  {
    timestamps: true,
    collection: "users",
  }
);

userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    return next();
  }

  this.password = await hashString(this.password);

  return next();
});

userSchema.methods.generateOtp = async function () {
  const userOtp = generateOtp(7);

  //encrypt otp and save to DB
  this.otp = await hashString(userOtp);

  // save otp expiry date to DB
  this.otp_time_expiry =
    Date.now() + 1000 * 60 * configs.OTP_TIME_EXPIRY_MINUTES;

  return userOtp;
};

userSchema.methods.isValidPassword = async (enteredPassword, dbPassword) => {
  const result = await compareString(enteredPassword, dbPassword);

  return result;
};

/**
 * Remove some attributes from users schema
 *
 */

userSchema.methods.toJSON = function () {
  const userObject = this.toObject();
  delete userObject.password;
  delete userObject.active;
  delete userObject.otp;
  delete userObject.otp_time_expiry;
  delete userObject.__v;

  return userObject;
};

export default model("User", userSchema);
