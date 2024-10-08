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
const homeRepository = require("../repositories/home-repository");
const cateiraRepository = require("../repositories/carteira-repository");
const transacaoRepository = require("../repositories/transacao-repository");
const Transacao = require("../models/transacao");
const usuarioRepository = require("../repositories/usuario-repository");
class TransacaoService {
}
_a = TransacaoService;
TransacaoService.listarDadosHome = (id_user, usuario_nome_token) => __awaiter(void 0, void 0, void 0, function* () {
    const query = yield homeRepository.getHomeData(id_user, 10);
    const username = usuario_nome_token;
    if (!query || query.data == null || query.data.length === 0) {
        return {
            status: 206,
            data: username,
            message: "Você ainda não possui transações feitas",
        };
    }
    return { status: 200, data: query.data, nome: username };
});
TransacaoService.listarHistoricoTransacao = (id_user) => __awaiter(void 0, void 0, void 0, function* () {
    var query = yield cateiraRepository.get(id_user, 10);
    console.log(query);
    if (!query || query.data.length === 0) {
        return {
            status: query.status,
            message: query.data
        };
    }
    const resultPorcentAndQuery = query.data
        .map((transacao) => {
        let total = parseFloat(transacao.saldoTotalGeral).toFixed(2);
        let valor = parseFloat(transacao.valor).toFixed(2);
        let tipo_operacao = transacao.tipo_operacao;
        if (tipo_operacao == "deposito") {
            let aumentoPorcent = (valor / total) * 100;
            console.log(`Aumento Percentual: ${aumentoPorcent.toFixed(2)}%`);
            return Object.assign(Object.assign({}, transacao), { porcentagem: `${aumentoPorcent.toFixed(2)}%` });
        }
        else if (tipo_operacao == "transferencia") {
            console.log(tipo_operacao);
            let diminuicaoPorcent = (valor / total) * 100;
            console.log(diminuicaoPorcent);
            console.log(`Diminuição Percentual: ${diminuicaoPorcent.toFixed(2)}%`);
            return Object.assign(Object.assign({}, transacao), { porcentagem: `${diminuicaoPorcent.toFixed(2)}%` });
        }
        return;
    })
        .filter((transacoes) => transacoes !== null);
    const campoSaltoTotalGeral = query.data.map((transacao) => transacao.saldoTotalGeral);
    const totalGeral = campoSaltoTotalGeral.length > 0 ? campoSaltoTotalGeral[0] : null;
    return { status: 200, data: { totalGeral, resultPorcentAndQuery } };
});
TransacaoService.listarExtratoGeral = (id_user) => __awaiter(void 0, void 0, void 0, function* () {
    const query = yield transacaoRepository.buscarExtratoGeral(id_user);
    if (!query || query.data.length === 0) {
        return {
            status: 204,
            message: "Você ainda não realizou transações",
        };
    }
    return { data: query.data, status: 200 };
});
TransacaoService.buscarExtratoContaBancaria = (id_user, contaBancariaId) => __awaiter(void 0, void 0, void 0, function* () {
    const query = yield transacaoRepository.buscarExtratoBancario(id_user, contaBancariaId);
    if (!query || query.data.length === 0) {
        return {
            status: 204,
            message: "Você ainda não realizou transações",
        };
    }
    return { data: query.data, status: 200 };
});
module.exports = TransacaoService;
