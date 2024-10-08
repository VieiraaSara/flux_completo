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
const repository = require('../repositories/usuario-repository');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const ValidationContract = require('../validators/fluent-validator');
const authService = require('../services/auth-service');
const { Model } = require('sequelize');
const service = require('../services/usuario-service');
class UsuarioController {
}
_a = UsuarioController;
//Buscar todos usuários
UsuarioController.listarUsuarios = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        //Recupera o token
        const token = req.body.token || req.query.token || req.headers['x-access-token'];
        // Decodifica o token
        const data = yield authService.decodeToken(token);
        const id_usuario = data.id;
        const usuarioList = yield service.get(id_usuario);
        if (!usuarioList.data) {
            return res.status(usuarioList.status).send({
                message: usuarioList.message
            });
        }
        res.status(usuarioList.status).send(usuarioList.data);
    }
    catch (error) {
        res.status(400).send({
            message: "Falha ao processar requisição: " + error
        });
    }
});
//Buscar usuario pelo id
UsuarioController.buscarUsuarioPeloID = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        //Recupera o token
        const token = req.body.token || req.query.token || req.headers['x-access-token'];
        // Decodifica o token
        const data = yield authService.decodeToken(token);
        const id = req.params.id;
        const usuario = yield service.getById(id);
        if (!usuario.data) {
            return res.status(usuario.status).send({
                message: usuario.message
            });
        }
        return res.status(usuario.status).send(usuario.data);
    }
    catch (error) {
        res.status(400).send({
            message: "Falha ao processar requisição: " + error
        });
    }
});
//Cadastrar usuário
UsuarioController.cadastrarUsuario = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let contract = new ValidationContract();
        contract.isEmail(req.body.email, 'Email inválido');
        contract.hasMinLen(req.body.senha, 3, 'O senha deve conter pelo menos 3 caracteres');
        if (!contract.isValid()) {
            res.status(400).send(contract.errors()).end();
            return;
        }
        const { nome, cpf, email, senha } = req.body;
        const usuario = yield service.create(nome, cpf, email, senha);
        if (usuario.status === 201) {
            res.status(201).send(usuario.data);
        }
        else {
            res.status(usuario.status).send({ message: usuario.message });
        }
    }
    catch (error) {
        res.status(500).send({
            message: "Falha ao processar requisição: " + error
        });
    }
});
//Atualizar usuário
UsuarioController.atualizarUsuario = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const usuario = yield service.update(req.params.id, req.body);
        if (usuario.status === 201) {
            return res.status(201).send(usuario.data);
        }
        else {
            return res.status(usuario.status).send({ message: usuario.message });
        }
    }
    catch (error) {
        // return res.status(500).send({
        //     message: "Falha ao processar requisição: " + error
        // });
        throw error;
    }
});
//Deletar usuário
UsuarioController.deletarUsuario = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const resultado = yield repository.delete(req.params.id);
        return res.status(resultado.status).json({ message: resultado.message });
    }
    catch (error) {
        res.status(404).send({
            message: "Falha ao processar requisição"
        });
    }
});
//Autenticar usuário (login)
UsuarioController.autenticar = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        console.log('senha: req.body.senha: ', req.body.senha);
        const usuario = yield repository.autenticar({
            email: req.body.email,
            senha: req.body.senha,
        });
        if (!usuario) {
            res.status(404).send({
                message: 'email ou senha inválidos'
            });
            return;
        }
        const token = yield authService.generateToken({
            id: usuario.id_usuario,
            email: usuario.email,
            nome: usuario.nome,
            roles: usuario.roles
        });
        res.status(201).send({
            token: token
        });
    }
    catch (error) {
        console.error('Erro ao autenticar usuario:', error);
        res.status(500).send({
            message: "Falha ao processar requisição"
        });
    }
});
// Refresh token
UsuarioController.refreshToken = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        //Recupera o token
        const token = req.body.token || req.query.token || req.headers['x-access-token'];
        // Decodifica o token
        const data = yield authService.decodeToken(token);
        const usuario_id_token = data.id;
        const usuario = yield repository.getById(usuario_id_token);
        if (!usuario || !usuario.data) {
            res.status(404).send({ message: 'Usuário não encontrado' });
            return;
        }
        // Criando novo token de um usuário existente
        const tokenData = yield authService.generateToken({
            id: usuario.data.id_usuario,
            email: usuario.data.email,
            nome: usuario.data.nome,
            roles: usuario.data.roles
        });
        return res.status(201).send({
            token: tokenData
        });
    }
    catch (error) {
        console.error('Erro ao autenticar cliente:', error);
        res.status(500).send({
            message: 'Falha ao processar sua requisição'
        });
    }
});
module.exports = UsuarioController;
