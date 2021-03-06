var express = require('express');
var router = express.Router();

const CitasController = require('../controllers/CitasController');
const auth = require('../middleware/auth'); 

// Mostrar citas
router.get('/', auth, CitasController.mostrarCitas);

// Crear cita
router.post('/nueva', auth, CitasController.nueva);

// Eliminar cita
router.delete('/', auth, CitasController.cancelar);

// Mostrar citas de determinado dia
router.post('/pendientes', auth, CitasController.pendientes);

// Modificar cita
router.put('/modificar', auth, CitasController.modificarCita);

// MOSTRAR citas de una mascota
router.post('/citasMascotas', auth, CitasController.citasMascotas);


module.exports = router;
