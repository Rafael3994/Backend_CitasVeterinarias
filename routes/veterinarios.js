var express = require('express');
var router = express.Router();

const VeterinariosController = require('../controllers/VeterinariosController');

// MOSTRAR VETERINARIOS
router.get('/', VeterinariosController.mostrarVeterinarios);
// REGISTRAR VETERINARIOS
router.post('/register', VeterinariosController.register);

module.exports = router;