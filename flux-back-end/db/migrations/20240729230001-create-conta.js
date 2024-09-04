'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
   await queryInterface.createTable('Conta',{
    id_conta: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      allowNull: false,
      autoIncrement: true
    },
    usuario_id: {
      type: Sequelize.INTEGER,
      allowNull: false,
      references: {
        model: 'Usuario',
        key: 'id_usuario',
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE'
      }
    },
    banco_id: {
      type: Sequelize.INTEGER,
      allowNull: false,
      references: {
        model: 'Banco',
        key: 'id_banco',
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE'
      }
    },
    saldo: {
      type: Sequelize.DECIMAL(10, 2),
      allowNull: false,
      defaultValue: 0.00,
     
    },
    tipo_conta: {
      type: Sequelize.ENUM('corrente', 'poupanca', 'salario'),
      defaultValue: "salario",
      allowNull: false
    }
  }, {
    Sequelize,
    modelName: 'Conta',
    tableName: 'conta'
  });



  
  },

  async down (queryInterface) {
   await queryInterface.dropTable('Conta');
  }
};
