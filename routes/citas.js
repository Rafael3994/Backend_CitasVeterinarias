var express = require('express');
var router = express.Router();

const CitasController = require('../controllers/CitasController');
const auth = require('../middleware/auth'); 

router.get('/', auth, CitasController.mostrarCitas);

router.post('/nueva', auth, CitasController.nueva);

router.delete('/', auth, CitasController.cancelar);

router.post('/pendientes', auth, CitasController.pendientes);


module.exports = router;
