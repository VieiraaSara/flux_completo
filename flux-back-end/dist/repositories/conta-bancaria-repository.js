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
const Conta = require('../models/conta-bancaria');
const Usuario = require('../models/usuario');
const Banco = require('../models/banco');
class ContaBancariaRepository {
}
_a = ContaBancariaRepository;
// listar contas bancarias  do usuario
ContaBancariaRepository.get = (usuario_id_TOKEN) => __awaiter(void 0, void 0, void 0, function* () {
    // Lista todas as contas pertencente ao usário
    const contaEncontrada = yield Conta.findAll({
        include: [
            {
                model: Banco,
                attributes: ['id_banco', 'name', 'image']
            }
        ],
        where: {
            usuario_id: usuario_id_TOKEN
        },
    });
    console.log(contaEncontrada);
    //  Verifica se a conta existe no banco
    if (!contaEncontrada) {
        return {
            message: 'Conta não encontrada ou inexistente',
            status: 404
        };
    }
    const res = contaEncontrada;
    return { data: res, status: 200 };
});
// cadastrar conta bancaria
ContaBancariaRepository.post = (body) => __awaiter(void 0, void 0, void 0, function* () {
    console.log("Request Body:", body);
    const tipo_conta = body.tipo_conta.toUpperCase();
    const usuario = yield Usuario.findByPk(body.fkUsuarioId);
    const banco = yield Banco.findByPk(body.fkBancoId);
    console.log("Banco ID:", body.fkBancoId);
    if (!usuario) {
        return {
            message: `O usuário com o ID ${body.fkUsuarioId} não foi encontrado`,
            status: 404
        };
    }
    if (!banco) {
        return { message: "Banco não encontrado", status: 404 };
    }
    const res = yield Conta.create({
        usuario_id: body.fkUsuarioId,
        banco_id: body.fkBancoId,
        saldo: body.saldo,
        tipo_conta: tipo_conta
    });
    return { data: res, status: 201 };
});
// atualizar conta bancaria do usuário
ContaBancariaRepository.put = (contaBancaria_id, novoSaldo, fkUsuarioId) => __awaiter(void 0, void 0, void 0, function* () {
    const contaEncontrada = yield Conta.findByPk(contaBancaria_id);
    if (!contaEncontrada) {
        return { message: 'Conta não encontrada', status: 404 };
    }
    const res = yield contaEncontrada.update({ saldo: novoSaldo });
    return { data: res, status: 201 };
});
// deletar conta bancaria do usuário
ContaBancariaRepository.delete = (id, usuario_id_TOKEN) => __awaiter(void 0, void 0, void 0, function* () {
    // Verifica se existe o usuario no banco e passado pelo token 
    const usuario_id = usuario_id_TOKEN;
    const usuario = yield Conta.findOne({ where: { usuario_id } });
    const banco = yield Conta.findOne({ where: { usuario_id } });
    if (!usuario) {
        return {
            message: `Você ainda não possui uma conta bancaria para deleta-lá`,
            status: 404
        };
    }
    if (!banco) {
        return { message: "Banco não encontrado", status: 404 };
    }
    // Verifica se a conta existe no banco
    const contaEncontrada = yield Conta.findOne({
        where: {
            id_conta: id,
            usuario_id: usuario_id
        }
    });
    if (!contaEncontrada) {
        return {
            message: 'Conta não encontrada ou inexistente',
            status: 404
        };
    }
    //  verifica se a conta pertence a um usuario
    if (contaEncontrada.usuario_id !== usuario_id) {
        return {
            message: 'Esta conta não pertence a você',
            status: 403
        };
    }
    yield contaEncontrada.destroy();
    return {
        message: 'Conta deletada com sucesso.',
        status: 200
    };
});
// Buscar uma conta bancaira do usuário
ContaBancariaRepository.findOne = (body) => __awaiter(void 0, void 0, void 0, function* () {
    const res = yield Conta.findOne({
        where: {
            id_conta: body.contaBancaria_id,
            usuario_id: body.usuario_id
        }
    });
    if (!res) {
        return { message: "Você não possui contas bancarias registradas", status: 404 };
    }
    return { data: res, status: 200 };
});
// Buscar conta bancaira pelo PK dela
ContaBancariaRepository.getById = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const res = yield Conta.findByPk(id);
    if (!res || res === null || res === undefined) {
        return { message: "Você não possui contas bancarias criadas", status: 404 };
    }
    return { data: res, status: 200 };
});
module.exports = ContaBancariaRepository;
