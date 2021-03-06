var express = require('express');
const { v4: uuidv4 } = require('uuid');

const Mascota = require('../models').Mascotas;

// MOSTRAR MASCOTAS
exports.mostrarMascotas = async (req, res, next) => {
  try {
    const mascota = await Mascota.findAll();
    res.status(200).json(mascota);  
  } catch (error) {
    res.status(500).json({});
  }
};

exports.mostrarMascotaByUuid = async (req, res, next) => {
  try {
    const { uuidMascota } = req.body;
    const mascota = await Mascota.findAll({
      where: {
        uuid: uuidMascota
    }});
    res.status(200).json(mascota);  
  } catch (error) {
    res.status(500).json({});
  }
};

// REGISTRAR MASCOTAS
exports.register =  async (req, res, next) => {
  try {
    const { name, tipo } = req.body;
    const newMascota = await Mascota.create({ uuid: uuidv4(), name: name, tipo: tipo, uuidUser: req.user.uuid});
    res.status(200).json(newMascota);
  } catch (error) {
    res.status(500).json({});
  }
}

// MODIFICAR MASCOTA
exports.modificar =  async (req, res, next) => {
  try {
    const { uuidMascota, name, tipo } = req.body;
    const newMascota = await Mascota.update({ 
      name: name,
      tipo: tipo
    }, {
      where: {uuid: uuidMascota}
    });
    res.status(200).json(newMascota);
  } catch (error) {
    res.status(500).json({});
  }
}