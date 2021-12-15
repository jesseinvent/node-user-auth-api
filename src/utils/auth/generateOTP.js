import otpGenerator from "otp-generator";

export default (length) => {
  const otp = otpGenerator.generate(length, {
    digits: true,
    alphabets: true,
    upperCase: true,
    specialChars: false,
  });
  return String(otp);
};
