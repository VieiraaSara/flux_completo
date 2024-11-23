const { Sequelize, QueryTypes, where } = require("sequelize");
const Transacao = require("../models/transacao");
const Banco = require("../models/banco");
const usarioRepository = require("./usuario-repository");
const Usuario = require("../models/usuario");

class HomeRepository {
  static getHomeData = async (id_user, limit) => {
    const nome = await usarioRepository.getById(id_user);

    const query = await Banco.sequelize.query(
      `SELECT 
    usuario.nome,
    transacao.conta_flux_origem_id,
    banco_origem.image AS imagem_banco_origem,
    banco_origem.name AS nome_banco_origem,
    transacao.conta_bancos_destino_id,
    banco_destino.image AS imagem_banco_destino,
    ROUND(transacao.valor, 2) AS valor,
    transacao.tipo_operacao,
    transacao.descricao,
    banco_destino.name AS nome_banco_destino,
    (SELECT 
            SUM(c.saldo)
        FROM
            conta_bancaria c
        WHERE
            c.usuario_id = usuario.id_usuario) AS saldoTotalGeral
FROM
    transacao
        JOIN
    conta_bancos AS conta_origem ON conta_origem.id_contaBancos = transacao.conta_flux_origem_id
        JOIN
    usuario ON usuario.id_usuario = conta_origem.usuario_id
        JOIN
    conta_bancaria AS conta_bancaria_origem ON conta_bancaria_origem.id_conta = conta_origem.contaBancaria_id
        JOIN
    banco AS banco_origem ON banco_origem.id_banco = conta_bancaria_origem.banco_id
        JOIN
    conta_bancos AS conta_destino ON conta_destino.id_contaBancos = transacao.conta_bancos_destino_id
        JOIN
    conta_bancaria AS conta_bancaria_destino ON conta_bancaria_destino.id_conta = conta_destino.contaBancaria_id
        JOIN
    banco AS banco_destino ON banco_destino.id_banco = conta_bancaria_destino.banco_id
WHERE
    usuario.id_usuario = :id_user
ORDER BY transacao.data_transacao DESC
LIMIT 10;
    `,
      {
        replacements: { id_user: id_user, limit: limit },
        type: QueryTypes.SELECT,
      }
    );

    if (query.length === 0) {
      const queryIfNotTransaction = await Usuario.sequelize.query(
        `
        SELECT 
            a.nome
        FROM
            usuario a
        WHERE
            a.id_usuario = :id_user `,
        {
          replacements: { id_user: id_user },
          type: QueryTypes.SELECT,
        }
      );

      return { status: 200, data: queryIfNotTransaction };
    }

    return { status: 200, data: query, nome: nome };
  };
}

module.exports = HomeRepository;
