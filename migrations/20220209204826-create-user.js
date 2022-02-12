'use strict';
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Users', {
      uuid: {
        primaryKey: true,
        allowNull: false,
        type: Sequelize.UUID
      },
      email: {
        type: Sequelize.STRING,
        unique: true,
      },
      password: {
        type: Sequelize.STRING
      },
      name: {
        type: Sequelize.STRING
      },
      subname: {
        type: Sequelize.STRING
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Users');
  }
};