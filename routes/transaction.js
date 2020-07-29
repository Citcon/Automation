const express = require('express');
const router = express.Router();
const getTransaction = require('../controller/transaction')

router.get('/', function(req, res, next) {

    const result = getTransaction()
    result.then(data=>{
        res.send(data[0].transaction_id)
    })


});

module.exports = router;