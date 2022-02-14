'use strict';
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Cita', {
      uuid: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.UUID
      },
      uuidUser: {
        type: Sequelize.UUID,
        onDelete: 'set null',
        references: { 
          model: 'users',
          key: 'uuid'
        }
      },
      uuidMascota: {
        type: Sequelize.UUID,
        onDelete: 'set null',
        references: { 
          model: 'mascotas',
          key: 'uuid'
        }
      },
      uuidVeterinario: {
        type: Sequelize.UUID,
        onDelete: 'set null',
        references: { 
          model: 'veterinarios',
          key: 'uuid'
        }
      },  
      inital_date: {
        type: Sequelize.DATE
      },
      final_date: {
        type: Sequelize.DATE
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
    await queryInterface.dropTable('Cita');
  }
};