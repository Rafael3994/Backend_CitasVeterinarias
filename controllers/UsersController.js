const { v4: uuidv4 } = require('uuid');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const User = require('../models').User;
const Token = require('../models').Token;
const Mascota = require('../models').Mascotas;

// Mostrar usuarios
exports.mostrarUsuarios = async (req, res, next) => {
    try {
        const users = await User.findAll();
        res.status(200).json(users);
    } catch (e) {
        res.status(500).json({});
    }
}

// Registrar usuario
exports.register = async (req, res, next) => {
        try {
          const {email, password, name, subname} = req.body;
          // Encripto la password
          const pass = await bcrypt.hashSync(password, 10);
          const response = await User.create({ uuid: uuidv4(), email: email, password: pass, name: name, subname: subname});
          const newUser = response.dataValues;
          res.status(200).json(newUser);
        } catch (e) {
          res.status(500).json({});
        }
}

// Eliminar usuario
exports.delete = async (req, res, next) => {
        try {
          const { uuidUser } = req.body;
          const deleteUser = await User.destroy({
            where: {
              uuid: uuidUser
            }
          });
          deleteUser === 1 ? res.status(200).json('Usuario Eliminado.') : res.status(200).json({});
        } catch (e) {
          res.status(500).json({});
        }
}

// Login usuario
exports.login =  async (req, res, next) => {
      try {
        const { email, password} = req.body;
        // Comprueba que el emial corresponde a un usuario
        const user = await User.findAll({
          where: {
            email: email
          }
        });
        if (!user) {
           throw new Error({ error: 'Invalid login credentials' })
        }
        // Comprueba que la password del usuario obtenido es la misma que la pasada 
        const isPasswordMatch = await bcrypt.compare(password, user[0].password);
        if (!isPasswordMatch) {
           throw new Error({ error: 'Invalid login credentials' })
        }
        // Se crea el token
        const newtoken = jwt.sign({uuid: user[0].uuid, name: user[0].name, email: user[0].email}, process.env.JWT_SECRET)
        const response = await Token.create({ uuid: uuidv4(), token: newtoken, uuidUser: user[0].uuid, device: null});
    
        res.status(200).json('Login User.');
      } catch (e) {
        res.status(500).json({});
      }
}

// Logout de todos los dispositivos
exports.logoutAll =  async (req, res, next) => { 
      try {
        const deleteToken = await Token.destroy({
          where: {
            uuidUser: req.user[0].uuid
          }
        });
        deleteToken >= 1 ? res.status(200).json('Logout All.') : res.status(200).json({});
      } catch (e) {
        res.status(500).json({});
      }
}

// Logout del dispositivo actual
exports.logout =   async (req, res, next) => { 
      try {
        const deleteToken = await Token.destroy({
          where: {
            token: req.token
          }
        });
        deleteToken === 1 ? res.status(200).json('Logout.') : res.status(200).json({});
      } catch (e) {
        res.status(500).json({});
      }
}

// Mostrar mascotas del usuario
exports.mastrarMascotas =   async (req, res, next) => {
    try {
      const mascotasUser = await Mascota.findAll({
        where: {
          uuidUser: req.user[0].uuid
        }
      });
      res.status(200).json(mascotasUser);
    } catch (e) {
      res.status(500).json({});
    }
}