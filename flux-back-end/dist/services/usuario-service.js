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
const Usuario = require('../models/usuario');
const repository = require('../repositories/usuario-repository');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
class UsuarioService {
    static generateVerifyCode() {
        let code = Math.floor(Math.random() * 1000000);
        return parseInt(code.toString().padStart(6, 0));
    }
}
_a = UsuarioService;
UsuarioService.get = (id_usuario) => __awaiter(void 0, void 0, void 0, function* () {
    const listUsuarios = yield repository.get(id_usuario);
    if (!listUsuarios) {
        return { message: 'Sem usuários encontrados', status: 400 };
    }
    return { data: listUsuarios, status: 200 };
});
UsuarioService.getById = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const usuario = yield repository.getById(id);
    if (!usuario.data) {
        return { message: usuario.message, status: usuario.status };
    }
    return { data: usuario.data, status: usuario.status };
});
UsuarioService.create = (nome, cpf, email, senha) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const verifyCode = _a.generateVerifyCode();
        const cpfExistente = yield Usuario.findOne({ where: { cpf: cpf } });
        const emailExistente = yield Usuario.findOne({ where: { email: email } });
        if (cpf.length < 11) {
            return { message: 'Quantidade de caracteres inválidos', status: 403 };
        }
        if (cpfExistente) {
            return { message: 'Este CPF já pertence a outro usuário', status: 403 };
        }
        if (emailExistente) {
            return { message: 'Este email já pertence a outro usuário', status: 403 };
        }
        const hashedPassword = yield bcrypt.hash(senha, 10);
        const usuario = yield repository.post({
            nome: nome,
            cpf: cpf,
            email: email,
            senha: hashedPassword,
            roles: "usuario",
            verifyCode: verifyCode
        });
        if (usuario.status !== 201) {
            return { message: usuario.message, status: usuario.status };
        }
        return { data: usuario.data, status: 201 };
    }
    catch (error) {
        console.error('Erro ao criar usuário no serviço:', error);
        return { message: 'Erro ao criar usuário', status: 500 };
    }
});
UsuarioService.update = (id, body) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const senha = body.senha;
        const usuario = yield repository.put(id, {
            nome: body.nome,
            cpf: body.cpf,
            email: body.email,
            senha: senha
        });
        if (usuario.status !== 201) {
            return { message: usuario.message, status: usuario.status };
        }
        return { data: usuario.data, status: 201 };
    }
    catch (error) {
        console.error('Erro ao criar usuário no serviço:', error);
        return { message: 'Erro ao atualizar usuário', status: 500 };
    }
});
module.exports = UsuarioService;
