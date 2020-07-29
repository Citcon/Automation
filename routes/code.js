var express = require('express');
var router = express.Router();
const getCode = require('../controller/code')

router.get('/', function(req, res, next) {

        const result = getCode()
        result.then(data=>{
                res.send(data)
        })


});

module.exports = router;
