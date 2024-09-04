'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Pix', {
      id_pix: {
        type: Sequelize.UUID,
        allowNull: false,
        primaryKey: true,
        defaultValue: Sequelize.UUIDV4
      },
      key: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true
      },
      key_type: {
        type: Sequelize.ENUM('EMAIL', 'CNPJ', 'TELEFONE', 'CHAVE_ALEATORIA'),
        allowNull: false
      },
      usuario_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'Usuario',
          key: 'id_usuario'
        },
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE'
      },
      banco_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'Banco',
          key: 'id_banco'
        },
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE'
      }
    });
  },

  async down(queryInterface) {
    await queryInterface.dropTable('Pix');
  }
};
