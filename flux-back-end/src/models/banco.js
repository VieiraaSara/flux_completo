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
      id:{
        type: DataTypes.INTEGER,
       
      },
      
      name: {
        type: DataTypes.STRING,
        
    
      },
      code: {
        type: DataTypes.STRING,
    
    
      },
      ispb:{
        type: DataTypes.STRING,
       
      },
      image: {
        type: DataTypes.STRING,
     
      },
      spi_participant_type:{
        type: DataTypes.ENUM('DIRETO','INDIRETO'),
     
      }
    }, {
      sequelize,
      modelName: 'Banco',
      tableName: 'banco'
    });
  }
}


module.exports = Banco;
