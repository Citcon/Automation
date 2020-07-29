var express = require('express');
var router = express.Router();

/**
 * @swagger
 *  /users/:
 *   get:
 *     description: get all users
 *     produces:
 *       - application/json
 *     responses:
 *       200:
 *         description: get all users
 *
 *     parameters:
*       - name: username
*         description: Username to use for login.
*         in: formData
*         required: true
*         type: string
*       - name: password
*         description: User's password.
*         in: formData
*         required: true
*         type: string
*/


router.get('/', function(req, res, next) {
  res.send('respond with a resource');

});
module.exports = router;
