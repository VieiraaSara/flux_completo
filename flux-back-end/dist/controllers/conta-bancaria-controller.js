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
const repository = require('../repositories/conta-bancaria-repository');
const authService = require('../services/auth-service');
const service = require('../services/conta-bancaria-service.js');
class ContaController {
}
_a = ContaController;
ContaController.listarContasBancarias = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        //Recupera o token
        const token = req.body.token || req.query.token || req.headers['x-access-token'];
        // Decodifica o token
        const dadosUsuario = yield authService.decodeToken(token);
        const contas = yield repository.get(dadosUsuario.id);
        if (contas.status === 200) {
            return res.status(contas.status).send(contas.data);
        }
        else {
            return res.status(contas.status).send({ message: contas.message });
        }
    }
    catch (error) {
        res.status(500).send({
            message: "Falha ao processar requisição " + error
        });
    }
});
ContaController.criarContaBancaria = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        //Recupera o token
        const token = req.body.token || req.query.token || req.headers['x-access-token'];
        // Decodifica o token
        const dadosUsuario = yield authService.decodeToken(token);
        const saldo = parseFloat(req.body.saldo);
        const tipo_conta = req.body.tipo_conta;
        const fkUsuarioId = dadosUsuario.id;
        const fkBancoId = req.body.fkBancoId;
        const resultado = yield service.criarContaBancaria(fkUsuarioId, fkBancoId, saldo, tipo_conta);
        if (resultado.status === 201) {
            return res.status(201).send(resultado.data);
        }
        else {
            return res.status(resultado.status).send({ message: resultado.message });
        }
    }
    catch (error) {
        throw error;
        // res.status(500).send({
        //     message: "Falha ao processar requisição" + error
        // })
    }
});
ContaController.atualizarContaBancaria = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const token = req.body.token || req.query.token || req.headers['x-access-token'];
        const dadosUsuario = yield authService.decodeToken(token);
        const contaID = req.params.id;
        const valor = parseFloat(req.body.saldo);
        const descricao = req.body.descricao;
        const fkUsuarioId = dadosUsuario.id;
        const fkBancoId = req.body.banco_id;
        const resultado = yield service.atualizarSaldo(contaID, valor, fkUsuarioId, descricao, fkBancoId);
        if (resultado.status === 201) {
            return res.status(201).send(resultado.data);
        }
        else {
            return res.status(resultado.status).send({ message: resultado.message });
        }
    }
    catch (error) {
        res.status(500).send({
            message: "Falha ao processar requisição: " + error
        });
    }
});
ContaController.deletarContaBancaria = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        //Recupera o token
        const token = req.body.token || req.query.token || req.headers['x-access-token'];
        // Decodifica o token
        const dadosUsuario = yield authService.decodeToken(token);
        const conta = yield repository.delete(req.params.id, dadosUsuario.id);
        if (conta.status === 201) {
            return res.status(conta.status).send(conta.data);
        }
        else {
            return res.status(conta.status).send({ message: conta.message });
        }
    }
    catch (error) {
        res.status(500).send({
            message: "Falha ao processar requisição" + error
        });
    }
});
ContaController.buscarContasBancariasPorId = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        //Recupera o token
        const token = req.body.token || req.query.token || req.headers['x-access-token'];
        // Decodifica o token
        const dadosUsuario = yield authService.decodeToken(token);
        const conta = yield repository.getById(req.params.id, dadosUsuario.id);
        if (conta.status === 200) {
            return res.status(conta.status).send(conta.data);
        }
        else {
            return res.status(conta.status).send({ message: conta.message });
        }
    }
    catch (error) {
        res.status(500).send({
            message: "Falha ao processar requisição" + error
        });
    }
});
module.exports = ContaController;
