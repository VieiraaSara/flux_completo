
const { Sequelize } = require('sequelize');
/* Crie um banco com o nome 'flux_db', o 
segundo parãmetro da linha abaixo é o seu usuario
e o segundo parâmetro é a senha do seu banco */

const conexao = new Sequelize('flux_db', 'root', '', {
    host: 'localhost',
   dialect: 'mysql',
    define: {
        timestamps: false,
        freezeTableName: true
    }
});

module.exports = conexao;