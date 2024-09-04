const conexao = require('../config/database');
const {  DataTypes, Model } = require('sequelize');

class Banco extends Model {
  static init(sequelize) {
    return super.init({
      id_banco: {
        autoIncrement: true,
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true
      },
      nome_banco: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
      },
      descricao: {
        type: DataTypes.TEXT,
        allowNull: true
      }
    }, {
      sequelize,
      modelName: 'Banco',
      tableName: 'banco'
    });
  }
}

Banco.init(conexao);

module.exports = Banco;
