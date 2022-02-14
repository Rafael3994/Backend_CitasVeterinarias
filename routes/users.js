var express = require('express');
var router = express.Router();

const UsersController = require('../controllers/UsersController');

const auth = require('../middleware/auth'); 

// MOSTRAR USERS
router.get('/', auth, UsersController.mostrarUsuarios);

// REGISTRAR USER
router.post('/register', UsersController.register);

// ELIMINAR USER
router.delete('/', auth, UsersController.delete);

// MODIFICAR USER
// router.put('/', );

// LOGIN USER
router.post('/login', UsersController.login);

// LOGOUT ALL USER
router.get('/logoutall', auth, UsersController.logoutAll);

// LOGOUT USER
router.get('/logout', auth, UsersController.logout);

// VER TODAS MASCOTAS DEL USER
router.get('/mascotas', auth, UsersController.mastrarMascotas);

module.exports = router;
