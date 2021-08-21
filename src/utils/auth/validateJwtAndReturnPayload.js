import jwt from "jsonwebtoken"

export default (jwtString) => {

   const payload = jwt.verify(jwtString, process.env.JWT_SECRET)
   return payload
}