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
const repository = require("../repositories/conta-bancaria-repository");
const authService = require("../services/auth-service");
const service = require("../services/conta-bancos-service");
class ContaBancosController {
}
_a = ContaBancosController;
ContaBancosController.listarContasFlux = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const token = req.body.token || req.query.token || req.headers["x-access-token"];
    const dadosUsuario = yield authService.decodeToken(token);
    const fkUsuarioId = dadosUsuario.id;
    const resultado = yield service.buscarContasDoFlux(fkUsuarioId);
    if (!resultado) {
        res.status(resultado.status).send({ message: resultado.message });
    }
    res.status(resultado.status).send(resultado.data);
});
ContaBancosController.criarTransferencia = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const token = req.body.token || req.query.token || req.headers["x-access-token"];
        const dadosUsuario = yield authService.decodeToken(token);
        const fkUsuarioId = dadosUsuario.id;
        const valor_transferencia = parseFloat(req.body.valor_transferencia);
        const id_conta_bancaria_flux_origem = req.body.id_conta_bancaria_origem;
        const descricao_transacao = req.body.descricao;
        const id_conta_bancaria_flux_destino = req.body.id_conta_bancaria_destino;
        const resultado = yield service.realizarTransferencia(id_conta_bancaria_flux_origem, valor_transferencia, fkUsuarioId, descricao_transacao, id_conta_bancaria_flux_destino);
        switch (resultado.status) {
            case 200:
                res.status(resultado.status).send({ data: resultado.data });
                break;
            case 201:
                res.status(resultado.status).send({ message: resultado.message, data: resultado.data });
                break;
            default:
                res.status(resultado.status).send({ message: resultado.message });
                break;
        }
    }
    catch (error) {
        res.status(500).send({
            message: "Falha ao processar requisição: " + error,
        });
    }
});
module.exports = ContaBancosController;
