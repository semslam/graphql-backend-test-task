const jwt = require("jsonwebtoken");
require("dotenv/config");
/**
 * Verify if the token is a wrong token
 * @param {Object} req 
 * @param {Object} res 
 * @param {Object} next 
 * @returns 
 */
module.exports = (req, res, next)=> {
  let decodedToken;
    try {
      const token = getToken(req, res, next);
    
     decodedToken = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET)
    
    } catch (err) {
      req.isAuth = false;
      return next();
    }

    if (!decodedToken) {
      req.isAuth = false;
      return next();
    }
    req.isAuth = true;
    // req.email = decodedToken.email;
    next(); 
  }
 /**
  * fetch the token form the header
  * @param {Object} req 
  * @param {Object} res 
  * @returns {String} token
  */
  const getToken =(req, res)=>{
    const authHeader = req.headers['authorization']
    if (!authHeader) {
      req.isAuth = false;
      return next();
    }
    const token = authHeader && authHeader.split(' ')[1]
    if (!token || token ===''){
      req.isAuth = false;
    return next();
    } 
    return token;
  }
