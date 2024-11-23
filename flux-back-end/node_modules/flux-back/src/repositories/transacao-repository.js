const { Sequelize, QueryTypes, where } = require("sequelize");
const Transacao = require("../models/transacao");
const Banco = require("../models/banco");

class TransacaoRepository {
  static buscarExtratoGeral = async (id_user, limit) => {
    const query = await Banco.sequelize.query(
      `
                    SELECT 
    usuario.id_usuario,
    usuario.nome,
    usuario.cpf,
    conta_bancaria.saldo AS valor_disponivel,
    banco.name AS nome_instituicao_financeira,
    (SELECT 
            SUM(c.saldo)
        FROM
            conta_bancaria AS c
        WHERE
            c.usuario_id = usuario.id_usuario) AS saldo_total_geral
FROM
    conta_bancaria
        JOIN
    banco ON conta_bancaria.banco_id = banco.id_banco
        JOIN
    usuario ON conta_bancaria.usuario_id = usuario.id_usuario 
    WHERE usuario.id_usuario = :id_user
    ORDER BY conta_bancaria.saldo DESC 

    `,
      {
        replacements: { id_user: id_user, limit: limit },
        type: QueryTypes.SELECT,
      }
    );

    return { status: 200, data: query };
  };
  static buscarExtratoBancario = async (id_user, contaBancariaId) => {
    const query = await Banco.sequelize.query(
      `
  SELECT 
    usuario.nome,
    usuario.cpf,
    pix.key,
    banco_origem.name AS nome_instituicao_financeira_origem,
    banco_destino.name AS nome_instituicao_financeira_destino,
    conta_bancaria_destino.id_conta as idContaBancariaDestino,
    conta_bancaria_origem.id_conta as idContaBancariaOrigem,
    conta_bancaria_origem.saldo saldoContaBancariaOrigem,
    conta_bancaria_destino.saldo as saldoContaBancariaDestino,
    transacao.data_transacao,
    transacao.descricao,
    transacao.valor,
    (SELECT 
            SUM(c.saldo)
        FROM
            conta_bancaria c
        WHERE
            c.usuario_id = usuario.id_usuario) AS saldoTotalGeral,
    (SELECT 
            SUM(a.valor)
        FROM
            transacao AS a
                JOIN
            conta_bancos AS cb ON a.conta_flux_origem_id = cb.id_contaBancos
        WHERE
            cb.contaBancaria_id = :contaBancariaId AND a.valor < 0) AS saidas,
    (SELECT 
            SUM(a.valor)
        FROM
            transacao AS a
                JOIN
            conta_bancos AS cb ON a.conta_flux_origem_id = cb.id_contaBancos
        WHERE
            cb.contaBancaria_id = :contaBancariaId AND a.valor > 0) AS entradas
FROM
    transacao
        JOIN
    conta_bancos AS conta_origem ON transacao.conta_flux_origem_id = conta_origem.id_contaBancos
        JOIN
    pix ON conta_origem.pix_id = pix.id_pix
        JOIN
    usuario ON conta_origem.usuario_id = usuario.id_usuario
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
    AND 
        conta_origem.contaBancaria_id = :contaBancariaId

ORDER BY transacao.data_transacao DESC;

  
      `,
      {
        replacements: { id_user: id_user, contaBancariaId: contaBancariaId },
        type: QueryTypes.SELECT,
      }
    );

    return { status: 200, data: query };
  };
}

module.exports = TransacaoRepository;
