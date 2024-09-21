const { Sequelize, QueryTypes, where } = require('sequelize');
const Transacao = require("../models/transacao");
const Banco = require('../models/banco');

class TransacaoRepository {

    static buscarExtratoGeral = async (id_user, limit) => {
        const query = await Banco.sequelize
            .query(`
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
         type: QueryTypes.SELECT
            });

        return { status: 200, data: query };
    }

}



module.exports = TransacaoRepository;