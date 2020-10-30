

const MYSQL_CONF_USER = {
    host: 'darth-uat.internal.citconpay.com',
    user: 'qingyan',
    password: 'Wqs$8$X7US',
    port: '3306',
    database: 'citcon_user'
}

const MYSQL_CONF_ALIPAY = {
    host: 'darth-uat.internal.citconpay.com',
    user: 'qingyan',
    password: 'Wqs$8$X7US',
    port: '3306',
    database: 'alipay'
}

const MYSQL_CONF_CHOP = {
    host: 'darth-uat.internal.citconpay.com',
    user: 'qingyan',
    password: 'Wqs$8$X7US',
    port: '3306',
    database: 'chop'
}


module.exports = {
    MYSQL_CONF_USER,
    MYSQL_CONF_ALIPAY,
    MYSQL_CONF_CHOP
} //只有一个值，不能用{}？