const {create,findOne} = require("../models/sqlite/DBConnection")

/**
 * create apiKey
 * @param {Object} args 
 * @returns {Object} apiKey
 */
const createKey = async (args) =>{
     if(Object.keys(args).length !== 3) throw new Error('Wrong parameter passed')
    return await create({
        email:args.email,
        password:args.hashPass,
        token:args.accessToken});
}
/**
 * 
 * @param {String} email 
 * @returns {Object} apiKey
 */
const find = async (email)=>{
    return await findOne(email);
}


module.exports = {createKey, find};