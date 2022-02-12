const { v4: uuidv4 } = require('uuid');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const User = require('../models').User;
const Token = require('../models').Token;
const Mascota = require('../models').Mascotas;


exports.mostrarUsuarios = async (req, res, next) => {
    try {
        const users = await User.findAll();
        res.status(200).json(users);
    } catch (e) {
        res.status(500).json({});
    }
}

exports.register = async (req, res, next) => {
        try {
          const {email, password, name, subname} = req.body;
          const pass = await bcrypt.hashSync(password, 10);
          const response = await User.create({ uuid: uuidv4(), email: email, password: pass, name: name, subname: subname});
          const newUser = response.dataValues;
          res.status(200).json(newUser);
        } catch (e) {
          res.status(500).json({});
        }
}


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

exports.login =  async (req, res, next) => {
      try {
        const { email, password} = req.body;
        const user = await User.findAll({
          where: {
            email: email
          }
        });
        if (!user) {
           throw new Error({ error: 'Invalid login credentials' })
        }
        const isPasswordMatch = await bcrypt.compare(password, user[0].password);
        if (!isPasswordMatch) {
           throw new Error({ error: 'Invalid login credentials' })
        }
    
        const newtoken = jwt.sign({uuid: user[0].uuid, name: user[0].name, email: user[0].email}, process.env.JWT_SECRET)
        const response = await Token.create({ uuid: uuidv4(), token: newtoken, uuidUser: user[0].uuid, device: null});
    
        res.status(200).json('Login User.');
      } catch (e) {
        res.status(500).json({});
      }
}

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
