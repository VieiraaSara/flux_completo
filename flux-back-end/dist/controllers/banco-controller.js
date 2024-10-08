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
const repository = require('../repositories/banco-repository');
const ValidationContract = require('../validators/fluent-validator');
const bancoService = require('../services/banco-transfeera-service');
const authService = require('../services/auth-service');
class BancoController {
}
_a = BancoController;
//Buscar todos os bancos com transfeera api
BancoController.listarBancos = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const token = req.body.token || req.query.token || req.headers['x-access-token'];
        const dadosUsuario = yield authService.decodeToken(token);
        const bancoList = yield repository.get();
        // const bancoList = await bancoService.returnListBanks(dadosUsuario);
        console.log(bancoList);
        if (!bancoList) {
            res.status(404).send({
                message: "Banco não encontrado"
            });
            return;
        }
        console.log(bancoList.name);
        res.status(200).send(bancoList.data);
    }
    catch (error) {
        res.status(400).send({
            message: "Falha ao processar requisição: " + error
        });
    }
});
BancoController.consultarBancos = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const token = req.body.token || req.query.token || req.headers['x-access-token'];
        const dadosUsuario = yield authService.decodeToken(token);
        const nomeInstituicao = req.body.instituicao;
        const bancoList = yield bancoService.returnListBanks(dadosUsuario, nomeInstituicao);
        if (!bancoList) {
            res.status(404).send({
                message: "Banco não encontrado"
            });
            return;
        }
        res.status(200).send(bancoList);
    }
    catch (error) {
        res.status(400).send({
            message: "Falha ao processar requisição: " + error
        });
    }
});
//Cadastrar banco
BancoController.cadastrarBanco = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const token = req.body.token || req.query.token || req.headers['x-access-token'];
        const dadosUsuario = yield authService.decodeToken(token);
        const cadastrar = req.body.cadastrar;
        const bancosCadastrados = yield bancoService.cadastrarInstituicoes(dadosUsuario);
        if (bancosCadastrados.status === 201) {
            res.status(201).send(bancosCadastrados.data);
        }
        else {
            res.status(bancosCadastrados.status).send({ message: banco.message });
        }
    }
    catch (error) {
        res.status(500).send({
            message: "Falha ao processar requisição" + error
        });
    }
});
// Atualizar Banco
BancoController.atualizarBanco = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const banco = yield repository.put(req.params.id, req.body);
        console.log(banco);
        return res.status(201).send(banco);
    }
    catch (error) {
        return res.status(500).send({
            message: "Falha ao processar requisição " + error
        });
    }
});
// Deletar Banco
BancoController.deletarBanco = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const banco = yield repository.delete(req.params.id);
        return res.status(200).send({
            message: "Banco deletado com sucesso!"
        });
    }
    catch (error) {
        res.status(500).send({
            message: "Falha ao processar requisição"
        });
    }
});
// Buscar bancos pelo id
BancoController.listarBancosPorId = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const banco = yield repository.getById(req.params.id);
        if (!banco) {
            res.status(404).send({
                message: "Banco não encontrado"
            });
            return;
        }
        res.status(200).send(banco);
    }
    catch (error) {
        res.status(400).send({
            message: "Falha ao processar requisição" + error
        });
    }
});
module.exports = BancoController;
