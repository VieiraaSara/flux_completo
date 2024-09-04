'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
   await queryInterface.createTable('Usuario',{
    id_usuario: {
      type: Sequelize.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    nome: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    cpf: {
      type: Sequelize.STRING,
      allowNull: false,
      unique: true
    },
    email: {
      type: Sequelize.STRING,
      allowNull: false,
      unique: true
    },
    senha: {
      type: Sequelize.STRING,
      allowNull: false
    },
    roles: {
      type: Sequelize.ENUM('usuario', 'admin'),
      allowNull: false
    }
   },{
    Sequelize,
    modelName: 'Usuario',
    tableName: 'usuario'
  }
  );

},

  async down (queryInterface) {
    await queryInterface.dropTable('Usuario')
  }
};
