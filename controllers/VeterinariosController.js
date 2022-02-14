var express = require('express');
const { v4: uuidv4 } = require('uuid');

const Veterinario = require('../models').Veterinario;

// MOSTRAR VETERINARIOS
exports.mostrarVeterinarios = async (req, res, next) => {
    const veterinario = await Veterinario.findAll();
    res.status(200).json(veterinario);
}

// REGISTRAR VETERINARIOS
exports.register = async (req, res, next) => {
  try {
    const { name, subname } = req.body;
    const newVeterinario = await Veterinario.create({ uuid: uuidv4(), name: name, subname: subname});
    res.status(200).json(newVeterinario);
  } catch (error) {
    res.status(500).json({});
  }
}