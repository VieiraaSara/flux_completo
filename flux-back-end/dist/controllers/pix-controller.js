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
const axios = require('axios');
const repository = require('../repositories/pix-repository');
const authServiceAPI = require('../services/auth-transfeera-service');
const authService = require('../services/auth-service');
const pixService = require('../services/pix-service');
require('dotenv').config();
class PixController {
}
_a = PixController;
PixController.criarChave = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const token = req.body.token || req.query.token || req.headers['x-access-token'];
        const dadosUsuario = yield authService.decodeToken(token);
        const banco_id = req.body.banco_id;
        const contaBancaria_id = req.body.conta_bancaria_id;
        const { key_type, key } = req.body;
        const accessToken = yield authServiceAPI.returnAccessToken();
        const response = yield pixService.criarChave(key_type, key, dadosUsuario, accessToken, banco_id, contaBancaria_id);
        if (response.status === 201) {
            return res.status(response.status).send(response.data);
        }
        else {
            return res.status(response.status).send({ message: response.message });
        }
    }
    catch (error) {
        res.status(400).send({
            message: "Falha ao processar requisição: " + error
        });
    }
});
PixController.verificarChave = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const idPix = req.params.id;
        const verifyCode = req.body.code;
        console.log('verifyCode: ', verifyCode);
        const token = req.body.token || req.query.token || req.headers['x-access-token'];
        const dadosUsuario = yield authService.decodeToken(token);
        const emailUsuario = dadosUsuario.email;
        const accessToken = yield authServiceAPI.returnAccessToken();
        const response = yield pixService.verificarChave(idPix, emailUsuario, accessToken, verifyCode);
        console.log('verifyCode: ', verifyCode);
        console.log(response.data);
        if (response.status === 200) {
            return res.status(200).send(response.data);
        }
        else {
            return res.status(response.status).send({ message: response.message });
        }
    }
    catch (error) {
        res.status(400).send({
            message: "Falha ao processar requisição: " + error
        });
    }
});
PixController.reenviarCodigo = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const idPix = req.params.id;
        const token = req.body.token || req.query.token || req.headers['x-access-token'];
        const dadosUsuario = yield authService.decodeToken(token);
        const emailUsuario = dadosUsuario.email;
        const accessToken = yield authServiceAPI.returnAccessToken();
        const response = yield pixService.reenviarCodigo(idPix, emailUsuario, accessToken);
        console.log(response.data);
        if (response.status === 200) {
            return res.status(200).send(response.data);
        }
        else {
            return res.status(response.status).send({ message: response.message });
        }
    }
    catch (error) {
        res.status(400).send({
            message: "Falha ao processar requisição: " + error
        });
    }
});
PixController.listarChavesPix = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        //Recupera o token
        const token = req.body.token || req.query.token || req.headers['x-access-token'];
        // Decodifica o token
        const dadosUsuario = yield authService.decodeToken(token);
        const pix = yield repository.get(dadosUsuario.id);
        if (pix.status === 200) {
            return res.status(pix.status).send(pix.data);
        }
        else {
            return res.status(pix.status).send({ message: pix.message });
        }
    }
    catch (error) {
        res.status(400).send({
            message: "Falha ao processar requisição: " + error
        });
    }
});
PixController.buscarChavePixPorID = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const idPix = req.params.id;
        const token = req.body.token || req.query.token || req.headers['x-access-token'];
        const dadosUsuario = yield authService.decodeToken(token);
        const accessToken = yield authServiceAPI.returnAccessToken();
        const response = yield pixService.buscarChaveId(idPix, dadosUsuario, accessToken);
        if (response.status !== 200) {
            return res.status(response.status).send(response.message);
        }
        return res.status(response.status).send(response.data);
    }
    catch (error) {
        res.status(400).send({
            message: "Falha ao processar requisição: " + error
        });
    }
});
PixController.deletarChave = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const idPix = req.params.id;
        const token = req.body.token || req.query.token || req.headers['x-access-token'];
        // Decodifica o token
        const dadosUsuario = yield authService.decodeToken(token);
        const usuario_id = dadosUsuario.id;
        const emailUsuario = dadosUsuario.email;
        const accessToken = yield authServiceAPI.returnAccessToken();
        const response = yield pixService.deletarChave(idPix, usuario_id, emailUsuario, accessToken);
        console.log(response.data);
        if (response.status === 200) {
            return res.status(response.status).json(response.data);
        }
        else {
            return res.status(response.status).send({ message: response.message });
        }
    }
    catch (error) {
        res.status(400).send({
            message: "Falha ao processar requisição: " + error
        });
    }
});
module.exports = PixController;
