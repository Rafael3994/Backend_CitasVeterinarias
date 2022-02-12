'use strict';
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Tokens', {
      uuid: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.UUID
      },
      token: {
        type: Sequelize.STRING
      },
      uuidUser: {
        type: Sequelize.UUID,
        onDelete: 'cascade',
        references: { 
          model: 'users',
          key: 'uuid'
        }
      },
      device: {
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
    await queryInterface.dropTable('Tokens');
  }
};