const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
require("dotenv/config");

/**
 * Generate access token
 * @param {Object} data 
 * @returns 
 */
const generateAccessToken =(data) =>{
        return jwt.sign(data, process.env.ACCESS_TOKEN_SECRET, { expiresIn: "365 days"})// 60, "2 days", "10h", "7d" "50s" "365 days" 
  }
/**
 * Decrypt provided token
 * @param {String} token 
 * @returns 
 */
const decryptToken = (token)=>{
   return jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, async (err, user) => {
        if(err) throw err.message
      return user
    });
}  
/**
 * Hash the provided password
 * @param {String} password 
 * @returns 
 */
const hashPassword = async (password)=>{
  return await bcrypt.hash(password, await bcrypt.genSalt());      
}
/**
 * Check if the provided password and hash password match
 * @param {String} clientPassword 
 * @param {String} hashedPassword 
 * @returns 
 */
const isPasswordMatch = async (clientPassword,hashedPassword)=>{
     return await bcrypt.compare(clientPassword,hashedPassword);
    
}

module.exports = {
    hashPassword,
    isPasswordMatch,
    generateAccessToken,
    decryptToken
}