const conexao = require('../config/database')
const Banco = require("./banco");
const ContaBancaria = require("./conta-bancaria");
const ContaBancos = require("./conta-bancos");
const Pix = require("./pix");
const Transacao = require("./transacao");
const Usuario = require("./usuario");

ContaBancos.init(conexao);
Usuario.init(conexao);
Banco.init(conexao);
ContaBancaria.init(conexao);
Pix.init(conexao);
ContaBancos.init(conexao);
Transacao.init(conexao);

Usuario.hasMany(ContaBancaria, { foreignKey: 'usuario_id', onDelete: 'CASCADE' });
ContaBancaria.belongsTo(Usuario, { foreignKey: 'usuario_id', onDelete: 'CASCADE' });

ContaBancos.belongsTo(Usuario, { foreignKey: 'usuario_id', onDelete: 'CASCADE' });
ContaBancos.belongsTo(ContaBancaria, { foreignKey: 'contaBancaria_id', onDelete: 'CASCADE' });

Pix.belongsTo(ContaBancos, { foreignKey: 'contaBancos_id', onDelete: 'CASCADE', onUpdate: 'CASCADE' });
ContaBancos.belongsTo(Pix, { foreignKey: 'pix_id', onDelete: 'CASCADE' });

// Transacao.belongsTo(ContaBancos, { foreignKey: 'contaBancos_id' });


  // conexao.sync({ alter: true });

module.exports = {
  Usuario,
  Banco,
  ContaBancaria,
  Pix,
  ContaBancos,
  Transacao,
};