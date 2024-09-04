const { Sequelize, QueryTypes, where } = require('sequelize');
const Transacao = require("../models/transacao");
const Banco = require('../models/banco');

class HomeRepository {

    static getHomeData = async (id_user, limit) => {
   
        const query = await Banco.sequelize
            .query(`
                SELECT 
                usuario.nome,
                conta_bancaria.id_conta,
               ROUND(transacao.valor, 2) AS valor,
                transacao.tipo_operacao,
                transacao.descricao,
                banco.nome_banco
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
                type: QueryTypes.SELECT
            });


        return { status: 200, data: query };
    }


}



module.exports = HomeRepository;