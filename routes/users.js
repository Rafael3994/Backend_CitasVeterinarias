var express = require('express');
var router = express.Router();

var UsersController = require('../controllers/UsersController');

router.post('/register', UsersController.register);

router.post('/login', UsersController.login);

router.post('/logout', UsersController.logout);

module.exports = router;
