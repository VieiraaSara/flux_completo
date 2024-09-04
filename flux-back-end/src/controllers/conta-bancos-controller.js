const repository = require('../repositories/conta-bancaria-repository');
const authService = require('../services/auth-service');
const service = require('../services/conta-bancos-service');



class ContaBancosController {
    static criarTransferencia = async (req, res) => {
        try {
            const token = req.body.token || req.query.token || req.headers['x-access-token'];
            const dadosUsuario = await authService.decodeToken(token);
            const fkUsuarioId = dadosUsuario.id;

            const conta_flux = req.params.id;
            const valor_transferencia = parseFloat(req.body.valor_transferencia);
            const id_conta_bancaria_origem = req.body.id_conta_bancaria_origem;

            const descricao_transacao = req.body.descricao;


            const id_conta_bancaria_destino = req.body.id_conta_bancaria_destino;

            const resultado = await service.realizarTransferencia(
                conta_flux,
                id_conta_bancaria_origem,
                valor_transferencia,
                fkUsuarioId,
                descricao_transacao,
                id_conta_bancaria_destino
            );

            switch (resultado.status) {
                case 200:
                    res.status(resultado.status).send({data:resultado.data});
                    break;
                case 201:
                    res.status(resultado.status).send({data:resultado.data});
                    break;
                default: res.status(resultado.status).send({ message: resultado.message });
                    break;
            }


        } catch (error) {
            res.status(500).send({
                message: "Falha ao processar requisição: " + error
            });

        }
    }
}

module.exports = ContaBancosController;