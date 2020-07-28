const { exec } = require('../db/alipay')


const getTransaction = () =>{
    const sql = `select * from transactions where partner_id= '300000233' and vendor='alipay' order by time_created desc limit 1`
    return exec(sql)
}

module.exports = getTransaction