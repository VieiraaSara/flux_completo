const conexao = require('../config/database');
const {  DataTypes, Model } = require('sequelize');

class Usuario extends Model {
  static init(sequelize) {
    return super.init({
      id_usuario: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true
      },
      nome: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      cpf: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
      },
      senha: {
        type: DataTypes.STRING,
        allowNull: false
      },
      roles: {
        type: DataTypes.ENUM('usuario', 'admin'),
        allowNull: false
      },
      verifyCode:{
        type: DataTypes.INTEGER(6),
        allowNull: true,
      },
      status:{
        type: DataTypes.BOOLEAN,
        allowNull: true,
        defaultValue: 0
      }
    }, {
      sequelize,
      modelName: 'Usuario',
      tableName: 'usuario'
    });
  }
}

Usuario.init(conexao);

module.exports =  Usuario;
