const mysql = require('mysql')
const { MYSQL_CONF_USER }= require('../conf/db')



const con = mysql.createConnection(MYSQL_CONF_USER)

con.connect()

function exec(sql){
    const promise = new Promise((resolve,reject) => {
        con.query(sql, (err, result)=>{
            if (err){
                reject(err)
                return
            }
            resolve(result)
        })
    })
    return promise
}

module.exports = {
    exec,
    escape: mysql.escape
}