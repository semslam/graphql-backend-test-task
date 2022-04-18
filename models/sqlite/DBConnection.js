const sqlite = require("sqlite3").verbose()
const db = new sqlite.Database(':memory:', err =>{
    if(err) console.log(err.message);

    console.log('database connected ...')
});
/**
 * create all the database if there not yet exist and return db connection
 * @returns {Object} db
 */
const createTables = ()=>{
    
    db.serialize(()=>{
        db.run(`CREATE TABLE IF NOT EXISTS apiKeys(id INTEGER PRIMARY KEY, email TEXT NOT NULL UNIQUE, password TEXT NOT NULL, token TEXT NOT NULL)`, err =>{
            if(err) return console.log(err.message);
    
            console.log('Table keys created...')
        })
    })

    return db;
}
/**
 * create a new apiKey and return the apiKeys Object
 * @param {Object} params 
 * @returns {Object} apiKey
 */
const create = params =>{
    return new Promise((resolve, reject)=>{
        db.serialize(()=>{
            db.run(`INSERT INTO apiKeys(email,password,token) VALUES (?,?,?)`,
            [params.email, params.password, params.token],
            (err)=>{
                if (err) reject(err.message);

                console.log("New apiKeys has been created!"); 
                const result = findOne(params.email);
                resolve(result);
            })
        })
    })
    
}
/**
 * fetch a apiKey record by email
 * @param {String} email 
 * @returns {Object} apiKey
 */
const findOne = (email)=>{
    return new Promise((resolve, reject)=>{
        db.serialize(()=>{
            db.get("SELECT * FROM apiKeys WHERE email = ?", email, (err, row)=>{
                if(err) reject(err);
    
                resolve(row);
            })
        })
    })

}
/**
 * fetch all the apiKeys
 * @returns {Object} apiKeys
 */
const findAll = ()=>{
    return new Promise((resolve, reject)=>{
        db.serialize(()=>{
            db.all("SELECT * FROM apiKeys ", [], (err, rows)=>{
                if (err) reject(err.message);
        
                resolve(rows);
            })
        })
    })
}


module.exports = {
    createTables,
    create,
    findOne,
    findAll
};