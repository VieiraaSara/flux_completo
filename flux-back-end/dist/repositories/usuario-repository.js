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
const { where } = require('sequelize');
const Usuario = require('../models/usuario');
const bcrypt = require('bcrypt');
class UsarioRepository {
}
_a = UsarioRepository;
//Buscar todos usuários
UsarioRepository.get = () => __awaiter(void 0, void 0, void 0, function* () {
    const res = yield Usuario.findAll();
    return res;
});
// Buscar pelo id
UsarioRepository.getById = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const res = yield Usuario.findByPk(id);
    if (!res) {
        return { message: 'Usuário não encontrado', status: 404 };
    }
    return { data: res, status: 200 };
});
// Buscar pela pk
UsarioRepository.getByPk = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const res = yield Usuario.findByPk(id);
    return res;
});
//Cadastrar usuário
UsarioRepository.post = (body) => __awaiter(void 0, void 0, void 0, function* () {
    const usuario = yield Usuario.create(body);
    if (!usuario) {
        return { message: "Erro ao criar usuário", status: 400 };
    }
    return { data: usuario, status: 201 };
});
//Atualizar usuário
UsarioRepository.put = (id, body) => __awaiter(void 0, void 0, void 0, function* () {
    const res = yield Usuario.findByPk(id)
        .then(usuarioEncontrado => {
        return usuarioEncontrado.update(body);
    });
    if (!res) {
        return { message: "Erro ao atualizar usuário", status: 400 };
    }
    return { data: res, status: 201 };
});
//Deletar usuário
UsarioRepository.delete = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const res = yield Usuario.findOne({ where: { id_usuario: id } });
    const usuarioEncontrado = yield Usuario.findOne({ where: { id_usuario: id } });
    if (!usuarioEncontrado) {
        return { message: 'Usuário não encontrado', status: 404 };
    }
    yield usuarioEncontrado.destroy();
    return { message: 'Usuário deletado com sucesso!', status: 200 };
});
//Autenticar usuário (login)
UsarioRepository.autenticar = (data) => __awaiter(void 0, void 0, void 0, function* () {
    console.log(data.email);
    console.log(data.email);
    console.log(data.email);
    console.log(data.email);
    const usuario = yield Usuario.findOne({
        where: {
            email: data.email
        }
    });
    if (!usuario) {
        return null;
    }
    const isPasswordValid = yield bcrypt.compare(data.senha, usuario.senha);
    if (!isPasswordValid) {
        return null;
    }
    return usuario;
});
module.exports = UsarioRepository;
