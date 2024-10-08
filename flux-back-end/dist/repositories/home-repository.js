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
const usarioRepository = require("./usuario-repository");
const Usuario = require("../models/usuario");
class HomeRepository {
}
_a = HomeRepository;
HomeRepository.getHomeData = (id_user, limit) => __awaiter(void 0, void 0, void 0, function* () {
    const nome = yield usarioRepository.getById(id_user);
    const query = yield Banco.sequelize.query(`
                SELECT 
                usuario.nome,
                conta_bancaria.id_conta,
               ROUND(transacao.valor, 2) AS valor,
                transacao.tipo_operacao,
                transacao.descricao,
                banco.image,
                banco.name as nome_banco,
    banco.image
            FROM
                transacao
                    JOIN
                conta_bancos ON conta_bancos.id_contaBancos = transacao.conta_flux_origem_id
                    JOIN
                usuario ON usuario.id_usuario = conta_bancos.usuario_id
                   
                JOIN conta_bancaria ON conta_bancaria.id_conta = conta_bancos.contaBancaria_id
                JOIN banco ON banco.id_banco = conta_bancaria.banco_id
            WHERE
                usuario.id_usuario  = :id_user 
         ORDER BY transacao.data_transacao DESC
    LIMIT  :limit
    `, {
        replacements: { id_user: id_user, limit: limit },
        type: QueryTypes.SELECT,
    });
    if (query.length === 0) {
        const queryIfNotTransaction = yield Usuario.sequelize.query(`
        SELECT 
            a.nome
        FROM
            usuario a
        WHERE
            a.id_usuario = :id_user `, {
            replacements: { id_user: id_user },
            type: QueryTypes.SELECT,
        });
        return { status: 200, data: queryIfNotTransaction };
    }
    return { status: 200, data: query, nome: nome };
});
module.exports = HomeRepository;
