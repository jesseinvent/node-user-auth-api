import bcrypt from "bcryptjs"

export const hashString = async (string) => {

   const salt = await bcrypt.genSalt(10)
   const hashed = await bcrypt.hash(string, salt)
   return hashed
}

export const compareString = async (string, hashedString) => {
   
   const result = await bcrypt.compare(string, hashedString)
   return result
}