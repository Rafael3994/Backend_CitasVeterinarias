var express = require('express');
var router = express.Router();
const { v4: uuidv4 } = require('uuid');

const MascotasController = require('../controllers/MascotasController');

const auth = require('../middleware/auth'); 

// MOSTRAR MASCOTAS
router.get('/', auth, MascotasController.mostrarMascotas);

// REGISTRAR MASCOTAS
router.post('/register', auth, MascotasController.register);

module.exports = router;
