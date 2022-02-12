'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Mascota extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Mascota.hasOne(models.User, {
        foreignKey: 'uuid',
        as: 'users',
        onDelete: 'cascade'
      })
    }
  }
  Mascota.init({
    uuid: {
      type: DataTypes.UUID,
      primaryKey: true
    },
    name: DataTypes.STRING,
    tipo: DataTypes.STRING,
    uuidUser: DataTypes.UUID
  }, 
  {
    sequelize,
    modelName: 'Mascotas',
  });
  return Mascota;
};