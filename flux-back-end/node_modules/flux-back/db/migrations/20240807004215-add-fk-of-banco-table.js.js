'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.addColumn('Transacao', 'banco_id', {
      type: Sequelize.INTEGER,
      allowNull: false,
      references: {
        model: 'banco', // Nome da tabela referenciada
        key: 'id_banco', // Nome da coluna referenciada
      },
      onDelete: 'CASCADE',
      onUpdate: 'CASCADE',
    });
  },

  async down(queryInterface) {
    await queryInterface.removeColumn('Transacao', 'banco_id');
  }
};
