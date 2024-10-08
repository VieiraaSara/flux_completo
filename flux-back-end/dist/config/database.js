
const { Sequelize } = require('sequelize');


const conexao = new Sequelize('bnuzxcjsxt0upmrdrdpo', 'utn3gom6kvdvh4si', 'UH7IAEGtvoNs0q3px69v', {
    host: 'bnuzxcjsxt0upmrdrdpo-mysql.services.clever-cloud.com',
   dialect: 'mysql',
    define: {
        timestamps: false,
        freezeTableName: true
    }
});

module.exports = conexao;