'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Banco', {
      id_banco: {
        autoIncrement: true,
        type: Sequelize.INTEGER,
        allowNull: false,
        primaryKey: true
      },
      nome_banco: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true
      },
      descricao: {
        type: Sequelize.TEXT,
        allowNull: true
      }
    }, {
      Sequelize,
      modelName: 'Banco',
      tableName: 'banco'
    });


  },


  async down(queryInterface) {
    await queryInterface.dropTable('Banco');
  }
};
