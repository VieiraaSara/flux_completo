'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
  await queryInterface.createTable('Transacao',{
    id_transacao: {
      type: Sequelize.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    conta_id: {
      type: Sequelize.INTEGER,
      allowNull: false,
      references: {
        model: 'Conta',
        key: 'id_conta',
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE'
      }
    },
    data_transacao: {
      type: Sequelize.DATE,
      allowNull: false
    },
    valor: {
      type: Sequelize.DECIMAL(10, 2),
      allowNull: false,
      defaultValue: 0.00,
    
    },
  
    tipo_operacao: {
      type: Sequelize.ENUM('entrada', 'retirada'),
      allowNull: false
    },
    descricao: {
      type: Sequelize.TEXT,
      allowNull: false
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
    }
  }, {
    Sequelize,
    modelName: 'Transacao',
    tableName: 'transacao'
  }

);


  },

  async down (queryInterface) {
   await queryInterface.dropTable('Transacao');
  }
};
