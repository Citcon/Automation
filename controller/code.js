const { exec } = require('../db/citconUser')


const getCode = () =>{
    const sql = `select auth_code from user_auth_codes where user_id= 11 
    order by time_created desc limit 1`
    return exec(sql).then(rows=>{
        return rows[0].auth_code //return 出去的还是Promise
    })
}

module.exports = getCode
