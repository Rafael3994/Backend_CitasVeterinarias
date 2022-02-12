'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Token extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Token.hasOne(models.User, {
        foreignKey: 'uuid',
        as: 'users',
        onDelete: 'cascade'
      })
    }
  }
  Token.init({
    uuid: {
      type: DataTypes.UUID,
      primaryKey: true
    },
    token: DataTypes.STRING,
    uuidUser: DataTypes.UUID,
    device: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Token',
  });
  return Token;
};