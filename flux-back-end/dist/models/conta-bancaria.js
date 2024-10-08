const conexao = require('../config/database');
const {  DataTypes, Model } = require('sequelize');


class ContaBancaria extends Model {

  static init(sequelize) {
    return super.init({
      id_conta: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        allowNull: false,
        autoIncrement: true
      },
      usuario_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: 'usuario',
          key: 'id_usuario',
          onDelete: 'CASCADE',
          onUpdate: 'CASCADE'
        }
      },
      banco_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: 'banco',
          key: 'id_banco',
          onDelete: 'CASCADE',
          onUpdate: 'CASCADE'
        }
      },
      
      saldo: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false,
        defaultValue: 0.00,

      },
      tipo_conta: {
        type: DataTypes.ENUM('CORRENTE', 'POUPANCA', 'SALARIO'),
        defaultValue: "SALARIO",
        allowNull: false
      }
    }, {
      sequelize,
      modelName: 'Conta',
      tableName: 'conta_bancaria'
    });

  }



}

ContaBancaria.init(conexao);

module.exports = ContaBancaria;
