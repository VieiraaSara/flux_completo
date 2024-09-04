const repository = require('../repositories/conta-bancaria-repository');
const authService = require('../services/auth-service');
const service = require('../services/conta-bancaria-service.js');

class ContaController {

    static listarContasBancarias = async (req, res) => {

        try {
            //Recupera o token
            const token = req.body.token || req.query.token || req.headers['x-access-token'];

            // Decodifica o token
            const dadosUsuario = await authService.decodeToken(token);

            const contas = await repository.get(dadosUsuario.id);

            if (contas.status === 200) {
                return res.status(contas.status).send(contas.data);
            } else {
                return res.status(contas.status).send({ message: contas.message });
            }
        } catch (error) {
            res.status(500).send({
                message: "Falha ao processar requisição " + error
            })
        }
    }

    static criarContaBancaria = async (req, res) => {

        try {
            //Recupera o token
            const token = req.body.token || req.query.token || req.headers['x-access-token'];
            // Decodifica o token
            const dadosUsuario = await authService.decodeToken(token);

            const saldo = parseFloat(req.body.saldo);
            const tipo_conta = req.body.tipo_conta
            const fkUsuarioId = dadosUsuario.id;
            const fkBancoId = req.body.banco_id;



            const resultado = await service.criarContaBancaria(fkUsuarioId, fkBancoId, tipo_conta, saldo);


            if (resultado.status === 201) {
                return res.status(201).send(resultado.data);
            } else {
                return res.status(resultado.status).send({ message: resultado.message });
            }

        } catch (error) {
            throw error
            // res.status(500).send({
            //     message: "Falha ao processar requisição" + error
            // })
        }
    }

    static atualizarContaBancaria = async (req, res) => {
        try {

            const token = req.body.token || req.query.token || req.headers['x-access-token'];
            const dadosUsuario = await authService.decodeToken(token);

            const contaID = req.params.id;
            const valor = parseFloat(req.body.saldo);
            const descricao = req.body.descricao;
            const fkUsuarioId = dadosUsuario.id;
            const fkBancoId = req.body.banco_id;

            const resultado = await service.atualizarSaldo(
                contaID,
                valor,
                fkUsuarioId,
                descricao,
                fkBancoId
            );

            if (resultado.status === 201) {
                return res.status(201).send(resultado.data);
            } else {
                return res.status(resultado.status).send({ message: resultado.message });
            }
        } catch (error) {
            res.status(500).send({
                message: "Falha ao processar requisição: " + error
            });

        }

    }

    static deletarContaBancaria = async (req, res) => {
        try {

            //Recupera o token
            const token = req.body.token || req.query.token || req.headers['x-access-token'];

            // Decodifica o token
            const dadosUsuario = await authService.decodeToken(token);


            const conta = await repository.delete(req.params.id, dadosUsuario.id);

            if (conta.status === 201) {
                return res.status(conta.status).send(conta.data);
            } else {
                return res.status(conta.status).send({ message: conta.message });
            }

        } catch (error) {
            res.status(500).send({
                message: "Falha ao processar requisição" + error
            })
        }
    }

    static buscarContasBancariasPorId = async (req, res) => {
        try {
            //Recupera o token
            const token = req.body.token || req.query.token || req.headers['x-access-token'];

            // Decodifica o token
            const dadosUsuario = await authService.decodeToken(token);


            const conta = await repository.getById(req.params.id, dadosUsuario.id);

            if (conta.status === 200) {
                return res.status(conta.status).send(conta.data);
            } else {
                return res.status(conta.status).send({ message: conta.message });
            }

        } catch (error) {
            res.status(500).send({
                message: "Falha ao processar requisição" + error
            })
        }
    }

}

module.exports = ContaController;
