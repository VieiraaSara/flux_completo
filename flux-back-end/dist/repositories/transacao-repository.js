"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var _a;
const { Sequelize, QueryTypes, where } = require("sequelize");
const Transacao = require("../models/transacao");
const Banco = require("../models/banco");
class TransacaoRepository {
}
_a = TransacaoRepository;
TransacaoRepository.buscarExtratoGeral = (id_user, limit) => __awaiter(void 0, void 0, void 0, function* () {
    const query = yield Banco.sequelize.query(`
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

    `, {
        replacements: { id_user: id_user, limit: limit },
        type: QueryTypes.SELECT,
    });
    return { status: 200, data: query };
});
TransacaoRepository.buscarExtratoBancario = (id_user, contaBancariaId) => __awaiter(void 0, void 0, void 0, function* () {
    const query = yield Banco.sequelize.query(`
                     SELECT 
    usuario.nome,
    usuario.cpf,
    pix.key,
    banco.name as nome_instituicao_financeira,
    transacao.data_transacao,
    transacao.descricao,
    transacao.valor,
    conta_bancaria.saldo AS saldo_total_geral,
   
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
    conta_bancos ON transacao.conta_flux_origem_id = conta_bancos.id_contaBancos
        JOIN
    pix ON conta_bancos.pix_id = pix.id_pix
        JOIN
    usuario ON conta_bancos.usuario_id = usuario.id_usuario
        JOIN
    conta_bancaria ON conta_bancaria.id_conta = conta_bancos.contaBancaria_id
        JOIN
    banco ON banco.id_banco = conta_bancaria.banco_id
WHERE
    usuario.id_usuario = :id_user
        AND conta_bancos.contaBancaria_id = :contaBancariaId
ORDER BY transacao.data_transacao DESC;
  
      `, {
        replacements: { id_user: id_user, contaBancariaId: contaBancariaId },
        type: QueryTypes.SELECT,
    });
    return { status: 200, data: query };
});
module.exports = TransacaoRepository;
