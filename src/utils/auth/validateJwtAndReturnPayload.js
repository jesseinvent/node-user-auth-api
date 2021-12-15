import jwt from "jsonwebtoken";
import { configs } from "../../config/configs.js";

export default (jwtString) => {
  const payload = jwt.verify(jwtString, configs.JWT_SECRET);
  return payload;
};
