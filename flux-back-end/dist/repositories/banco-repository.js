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
const Banco = require('../models/banco');
class BancoRepository {
}
_a = BancoRepository;
//Listar bancos
BancoRepository.get = () => __awaiter(void 0, void 0, void 0, function* () {
    const res = yield Banco.findAll();
    if (!res) {
        return { message: "Bancos não encontrados", status: 404 };
    }
    return { data: res, status: 200 };
});
// Cadastrar banco
BancoRepository.post = (body) => __awaiter(void 0, void 0, void 0, function* () {
    console.log(body.id_banco);
    console.log(body.code);
    console.log(body.ispb);
    console.log(body.name);
    console.log(body.id);
    console.log(body);
    console.log(body);
    const res = yield Banco.create(body);
    return { data: res, status: 201 };
});
// Atualizar banco pelo ID
BancoRepository.put = (id, body) => __awaiter(void 0, void 0, void 0, function* () {
    const res = yield Banco.findByPk(id)
        .then(bancoEncontrado => {
        if (!bancoEncontrado || bancoEncontrado === null) {
            return console.log('Banco não encontrado');
        }
        return bancoEncontrado.update(body);
    });
    return res;
});
// Deletar banco pelo ID
BancoRepository.delete = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const res = yield Banco.findByPk(id)
        .then(BancoEncontrado => {
        if (!BancoEncontrado || BancoEncontrado === null) {
            console.log('Banco não encontrado');
        }
        return BancoEncontrado.destroy({
            where: {
                id
            }
        });
    });
    return res;
});
// Buscar banco pelo ID
BancoRepository.getById = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const res = yield Banco.findByPk(id);
    return res;
});
BancoRepository.findOneByName = (name) => __awaiter(void 0, void 0, void 0, function* () {
    const res = yield Banco.findOne(name);
    return res;
});
module.exports = BancoRepository;
