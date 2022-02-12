const { v4: uuidv4 } = require('uuid');
const { Op } = require("sequelize");


const Cita = require('../models').Cita;
const Mascota = require('../models').Mascotas;
const Veterinario = require('../models').Veterinario;

// MOSTRAR CITAS
exports.mostrarCitas = async (req, res, next) => {
  const citas = await Cita.findAll();
  res.status(200).json(citas);
}

// CREAR CITA
// TODO: MIRAR COMO COMPROVAR LAS CITAS
exports.nueva =  async (req, res, next) => {
    try {
      const { mascota, veterinario, hora } = req.body;
      const mascotaUser = await Mascota.findAll({
          where: {
              [Op.and]: [
                  { uuidUser: req.user[0].uuid },
                  { uuid: mascota }
              ]
          }
      });
      if (mascotaUser[0] === undefined) {
          return res.status(500).json({});
      }
      const resVeterinario = await Veterinario.findAll({
          where: {
              uuid: veterinario
          }
      });
      if (resVeterinario[0] === undefined) {
          return res.status(500).json({});
      }
      var today= new Date(hora)
      let dateInital = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate()+' '+ (today.getHours()+1) + ":" + today.getMinutes() + ":" + today.getSeconds();
      let dateFinal = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate()+' '+ (today.getHours()+2) + ":" + today.getMinutes() + ":" + today.getSeconds();
      const newCita = await Cita.create({ uuid: uuidv4(), uuidUser: req.user[0].uuid, uuidMascota: mascotaUser[0].uuid, uuidVeterinario: resVeterinario[0].uuid, inital_date: dateInital, final_date: dateFinal});
      res.status(200).json(newCita);
    } catch (error) {
      res.status(500).json({});
    }
}

// TODO: MODICAR CITA

// CANCELAR CITA
exports.cancelar = async (req, res, next) => {
    try {
        const { hora } = req.body;
        var date = new Date(hora)
        let dateInital = date.getFullYear()+'-'+(date.getMonth()+1)+'-'+date.getDate()+' '+ (date.getHours()+1) + ":" + date.getMinutes() + ":" + date.getSeconds();
        const resCita = await Cita.findAll({
            where: {
                [Op.and]: [
                    { uuidUser: req.user[0].uuid },
                    { inital_date: dateInital }
                ]
            }
        });
        if (resCita[0] === undefined) {
            return res.status(500).json({});
        }
        const deleteCita = await Cita.destroy({
            where: {
              uuid: resCita[0].uuid
            }
        });
        deleteCita === 1 ? res.status(200).json('Cita Eliminada.') : res.status(200).json({});

    } catch (error) {
      res.status(500).json({});
    }
}

// TODO: LISTADO DE CITAS PENDIENTES
// exports.pendientes = async (req, res, next) => {
//     try {
//         const { hora } = req.body;
//         var date = new Date(hora)
//         let dateInital = date.getFullYear()+'-'+(date.getMonth()+1)+'-'+date.getDate()+' '+ (date.getHours()) + ":" + date.getMinutes() + ":" + date.getSeconds();
//         console.log(req.user[0].uuid);
//         console.log(dateInital);
//         const resCita = await Cita.findAll({
//             where: {
//                     inital_date: dateInital
//             }
//         });
//         if (resCita[0] === undefined) {
//             return res.status(500).json({});
//         }

//         res.status(200).json({});

//     } catch (error) {
//       res.status(500).json({});
//     }
// }