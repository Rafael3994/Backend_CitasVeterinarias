var express = require('express');
var router = express.Router();
const { v4: uuidv4 } = require('uuid');

const Mascota = require('../models').Mascotas;

const auth = require('../middleware/auth'); 

// MOSTRAR MASCOTAS
exports.mostrarMascotas = async (req, res, next) => {
  try {
    const mascota = await Mascota.findAll();
    res.status(200).json(mascota);  
  } catch (error) {
    res.status(500).json({});
  }
};

// REGISTRAR MASCOTAS
exports.register =  async (req, res, next) => {
  try {
    const { name, tipo } = req.body;
    const newMascota = await Mascota.create({ uuid: uuidv4(), name: name, tipo: tipo, uuidUser: req.user[0].uuid});
    res.status(200).json(newMascota);
  } catch (error) {
    res.status(500).json({});
  }
}