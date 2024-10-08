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
const pixRepository = require('../repositories/pix-repository');
const { ContaBancos, ContaBancaria, Pix, Banco } = require('../models');
class ContaBancosRepository {
}
_a = ContaBancosRepository;
// listar contas bancarias  do usuario
ContaBancosRepository.get = (usuario_id_TOKEN) => __awaiter(void 0, void 0, void 0, function* () {
    console.log('REPOSITORY', usuario_id_TOKEN);
    // Lista todas as contas pertencente ao usário
    const contaEncontrada = yield ContaBancos.findAll({
        include: [
            {
                model: ContaBancaria,
                include: { model: Banco }
            },
            {
                model: Pix
            }
        ],
        where: {
            usuario_id: usuario_id_TOKEN
        }
    });
    //  Verifica se a conta existe no banco
    if (!contaEncontrada) {
        return {
            message: 'Você não possui contas bancárias disponíveis para realizar transações',
            status: 404
        };
    }
    const res = contaEncontrada;
    return { data: res, status: 200 };
});
ContaBancosRepository.findOne = (body) => __awaiter(void 0, void 0, void 0, function* () {
    const contaEncontrada = yield ContaBancos.findOne({
        include: [{
                model: ContaBancaria,
            }, { model: Pix }],
        where: {
            usuario_id: body.usuario_id,
            id_contaBancos: body.contaBancaria_id
        },
    });
    if (!contaEncontrada) {
        return {
            message: 'Conta não encontrada ou inexistente',
            status: 404,
        };
    }
    const res = contaEncontrada;
    return { data: res, status: 200 };
});
// relacionar o pix com a conta bancos
ContaBancosRepository.post = (body) => __awaiter(void 0, void 0, void 0, function* () {
    const res = yield ContaBancos.create({
        pix_id: body.id_pix,
        usuario_id: body.usuario_id,
        contaBancaria_id: body.contaBancaria_id,
        banco_id: body.banco_id,
    });
    if (!res) {
        return {
            message: 'Erro ao vincular chave pix e conta bancaria',
            status: 400
        };
    }
    return { data: `Chave vinculada com sucesso! \n ${res}`, status: 201 };
});
// atualizar conta bancaria do usuário
ContaBancosRepository.put = (id, novoSaldo) => __awaiter(void 0, void 0, void 0, function* () {
    return yield ContaBancos.update({ saldo: novoSaldo }, { where: { contaBancaria_id: id } });
});
// deletar conta bancaria do usuário
ContaBancosRepository.deletePix = (idPix, usuario_id) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const pixDelete = yield pixRepository.delete(idPix);
        if (!pixDelete) {
            return {
                message: 'Erro deletar conta bancaria',
                status: 400
            };
        }
        return { data: 'Chave Pix deletada com sucesso!', status: 200 };
    }
    catch (error) {
        console.error(error);
        return {
            message: 'Erro ao deletar entradas da tabela ContaBancos',
            status: 500
        };
    }
});
// Buscar conta pelo ID dela
ContaBancosRepository.getById = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const res = yield ContaBancos.findByPk(id);
    return res;
});
module.exports = ContaBancosRepository;
