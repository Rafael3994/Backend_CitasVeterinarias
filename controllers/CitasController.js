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

      const resCita = await Cita.findAll();
        
        if (resCita[0] !== undefined) {      
            let date= new Date(hora)
            let dateInital = date.getFullYear()+(date.getMonth()+1)+date.getDate()+' '+(date.getHours())+' '+date.getMinutes()+' '+date.getSeconds();      
            const citasFilter = resCita.filter((cita) => {
               const dateCita = cita.inital_date.getFullYear()+(cita.inital_date.getMonth()+1)+cita.inital_date.getDate()+' '+(cita.inital_date.getHours()-1)+' '+cita.inital_date.getMinutes()+' '+cita.inital_date.getSeconds();
               if (dateCita === dateInital) {
                   return cita;
               }
            })
            if (citasFilter[0] !== undefined ){
               return res.status(500).json({});          
            }
        }

      let today= new Date(hora)
      let dateInital = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate()+' '+ (today.getHours()+1) + ":" + today.getMinutes() + ":" + today.getSeconds();
      let dateFinal = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate()+' '+ (today.getHours()+2) + ":" + today.getMinutes() + ":" + today.getSeconds();
      const newCita = await Cita.create({ uuid: uuidv4(), uuidUser: req.user[0].uuid, uuidMascota: mascotaUser[0].uuid, uuidVeterinario: resVeterinario[0].uuid, inital_date: dateInital, final_date: dateFinal});
      res.status(200).json(newCita);
    } catch (error) {
        console.log(error);
      res.status(500).json({});
    }
}

// MODICAR CITA
exports.modificarCita = async (req, res, next) => {
    // TODO: Si me da tiempo a los roles, mirar sentencia.
    const { uuidCita, hora} = req.body;
    
    // COMPROBAR QUE LA CITA EXISTE Y ES DEL USUARIO
    const resCitaUsu = await Cita.findAll({
        where: {
            [Op.and]: [
                { uuidUser: req.user[0].uuid },
                { uuid: uuidCita }
            ]
        }
    });
    if (resCitaUsu[0] === undefined) {
        return res.status(500).json({});
    }

    // COMPROBAR QUE ESA HORA ESTA DISPONIBLE
    const resCita = await Cita.findAll();
    
    let date = new Date(hora);
    let dateInital = date.getFullYear()+(date.getMonth()+1)+date.getDate()+' '+(date.getHours())+' '+date.getMinutes()+' '+date.getSeconds();
    
    const citasSameDate = resCita.filter((cita) => {
        const dateCita = cita.inital_date.getFullYear()+(cita.inital_date.getMonth()+1)+cita.inital_date.getDate()+' '+(cita.inital_date.getHours()-1)+' '+cita.inital_date.getMinutes()+' '+cita.inital_date.getSeconds();
        console.log('dateCita '+dateCita);
        console.log('dateInital '+dateInital);
        if (dateCita === dateInital) {
            return cita;
        }
    })
    if (citasSameDate[0] !== undefined) {
        return res.status(500).json({});
    }

    // ACTUALIZAR
    dateInital = date.getFullYear()+'-'+(date.getMonth()+1)+'-'+date.getDate()+' '+ (date.getHours()+1) + ":" + date.getMinutes() + ":" + date.getSeconds();
    let dateFinal = date.getFullYear()+'-'+(date.getMonth()+1)+'-'+date.getDate()+' '+ (date.getHours()+2) + ":" + date.getMinutes() + ":" + date.getSeconds();

    const newCita = await Cita.update({ 
            inital_date: dateInital,
            final_date: dateFinal 
        }, {
        where: {
            [Op.and]: [
                { uuidUser: req.user[0].uuid },
                { uuid: uuidCita }
            ]
        }
    });

    newCita[0] === 1 ? res.status(200).json('Cita actualizada.') : res.status(204).json({})
    
  }

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


exports.pendientes = async (req, res, next) => {
    try {
        const { hora } = req.body;
        var date = new Date(hora)
        let dateInital = date.getFullYear()+(date.getMonth()+1)+date.getDate();
        console.log(dateInital);
        const resCita = await Cita.findAll();
        if (resCita[0] === undefined) {
            return res.status(200).json({});
        }
        const citasFilter = resCita.filter((cita) => {
            const dateCita = cita.inital_date.getFullYear()+(cita.inital_date.getMonth()+1)+cita.inital_date.getDate();
            if (dateCita === dateInital) {
                return cita;
            }
        })
        res.status(200).json(citasFilter);
    } catch (error) {
        console.log(error);
      res.status(500).json({});
    }
}