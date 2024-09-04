const repository = require('../repositories/banco-repository');
const ValidationContract = require('../validators/fluent-validator');
const bancoService = require('../services/banco-transfeera-service')
const authService = require('../services/auth-service')
class BancoController {

    //Buscar todos os bancos com transfeera api
    static listarBancos = async (req, res) => {

        try {
            const token = req.body.token || req.query.token || req.headers['x-access-token'];
            const dadosUsuario = await authService.decodeToken(token);

            // const bancoList = await repository.get();
            const bancoList = await bancoService.returnListBanks(dadosUsuario);

            if (!bancoList) {
                res.status(404).send({
                    message: "Banco não encontrado"
                });
                return;
            }

            res.status(200).send(bancoList);
        } catch (error) {
            res.status(400).send({
                message: "Falha ao processar requisição: " + error
            })
        }
    };

    static consultarBancos = async (req, res) => {
        try {
            const token = req.body.token || req.query.token || req.headers['x-access-token'];
            const dadosUsuario = await authService.decodeToken(token);
            const nomeInstituicao = req.body.instituicao

            const bancoList = await bancoService.returnListBanks(dadosUsuario, nomeInstituicao);

            if (!bancoList) {
                res.status(404).send({
                    message: "Banco não encontrado"
                });
                return;
            }

            res.status(200).send(bancoList);
        } catch (error) {
            res.status(400).send({
                message: "Falha ao processar requisição: " + error
            })
        }
    }

    //Cadastrar banco
    static cadastrarBanco = async (req, res) => {

        try {
            let contract = new ValidationContract();
            contract.hasMinLen(req.body.nome_banco, 3, 'O nome do banco deve conter pelo menos 3 caracteres');

            contract.hasMinLen(req.body.descricao, 5, 'A descricao  deve conter pelo menos 5 caracteres');


            if (!contract.isValid()) {
                res.status(400).send(contract.errors()).end();
                return;
            }

            const banco = await repository.post({
                nome_banco: req.body.nome_banco,
                descricao: req.body.descricao

            });
            if (banco.status === 201) {
                res.status(201).send(banco.data);

            } else {
                res.status(banco.status).send({ message: banco.message });
            }


        } catch (error) {
            res.status(500).send({
                message: "Falha ao processar requisição" + error
            })

        }
    }

    // Atualizar Banco
    static atualizarBanco = async (req, res) => {
        try {
            const banco = await repository.put(req.params.id, req.body);
            console.log(banco);
            return res.status(201).send(banco);

        } catch (error) {
            return res.status(500).send({
                message: "Falha ao processar requisição " + error

            });
        }


    }

    // Deletar Banco
    static deletarBanco = async (req, res) => {
        try {
            const banco = await repository.delete(req.params.id);

            return res.status(200).send({
                message: "Banco deletado com sucesso!"
            });
        } catch (error) {
            res.status(500).send({
                message: "Falha ao processar requisição"
            });
        }
    }

    // Buscar bancos pelo id
    static listarBancosPorId = async (req, res) => {
        try {
            const banco = await repository.getById(req.params.id);

            if (!banco) {
                res.status(404).send({
                    message: "Banco não encontrado"
                });
                return;
            }

            res.status(200).send(banco);
        } catch (error) {
            res.status(400).send({
                message: "Falha ao processar requisição" + error
            })
        }
    }


}

module.exports = BancoController;