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
const contaBancariaRepository = require('../repositories/conta-bancaria-repository');
const contaBancosRepository = require('../repositories/conta-bancos-repository');
require('dotenv').config();
class PixService {
}
_a = PixService;
PixService.criarChave = (key_type, key, dadosUsuario, accessToken, banco_id, contaBancaria_id) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const usuario_id = dadosUsuario.id;
        const key_typeUpCase = key_type.toUpperCase();
        const chaveExistente = yield repository.findByKey(key);
        if (chaveExistente.status === 409) {
            return { status: chaveExistente.status, message: response.data.statusCode };
        }
        const contasBancariasDisponiveis = yield contaBancariaRepository.findOne({ contaBancaria_id, usuario_id });
        if (!contasBancariasDisponiveis.data) {
            return { message: contasBancariasDisponiveis.message, status: contasBancariasDisponiveis.status };
        }
        const contaBancariaUsuario = contasBancariasDisponiveis.data.id_conta;
        const options = {
            method: 'POST',
            url: 'https://api-sandbox.transfeera.com/pix/key',
            headers: {
                accept: 'application/json',
                'content-type': 'application/json',
                'user-Agent': dadosUsuario.email,
                Authorization: `Bearer ${accessToken}`
            },
            data: { key: key, key_type: key_typeUpCase }
        };
        console.log("EMAIL ENVIADO PARA ", dadosUsuario.email);
        console.log(options);
        const response = yield axios.request(options);
        const createdKey = response.data;
        const id_pix = createdKey.id;
        const pix = yield repository.post({
            id_pix,
            key: createdKey.key,
            key_type: createdKey.key_type,
            usuario_id: dadosUsuario.id
        });
        const contaBancos = yield contaBancosRepository.post({
            id_pix,
            usuario_id: dadosUsuario.id,
            contaBancaria_id: contaBancariaUsuario,
            banco_id: banco_id
        });
        if (!contaBancos) {
            return { message: contaBancos.message, status: contaBancos.status };
        }
        if (pix.status === 201) {
            return { status: pix.status, data: createdKey };
        }
        else if (pix.status === 409) {
            return { status: pix.status || 500, message: response.data.statusCode };
        }
        else {
            return { status: pix.status || 500, message: response.data.statusCode };
        }
    }
    catch (error) {
        console.error('Error creating PIX key:', error);
        // Retornar a mensagem de erro da API da Transfeera ou do banco de dados
        if (error.code === 'ER_DUP_ENTRY') {
            return {
                status: 400,
                message: 'Chave Pix já registrada no banco de dados'
            };
        }
        if (error.response && error.response.data) {
            return {
                status: error.response.data.statusCode || 500,
                message: error.response.data.message
            };
        }
        else {
            return {
                status: 500,
                message: 'Erro interno do servidor'
            };
        }
    }
});
PixService.verificarChave = (idPix, emailUsuario, accessToken, verifyCode) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        console.log(verifyCode);
        if (verifyCode.length !== 6) {
            return {
                message: 'A chave deve conter apenas 6 dígitos numéricos',
                status: 400
            };
        }
        // const accessToken = await authServiceAPI.returnAccessToken();
        const verifyOptions = {
            method: 'PUT',
            url: `https://api-sandbox.transfeera.com/pix/key/${idPix}/verify`,
            headers: {
                accept: 'application/json',
                'content-type': 'application/json',
                'User-Agent': emailUsuario,
                Authorization: `Bearer ${accessToken}`
            },
            data: { code: verifyCode }
        };
        const verifyResponse = yield axios.request(verifyOptions);
        console.log('Verify Response:', verifyResponse.data);
        // Consultar o status após a verificação
        const statusOptions = {
            method: 'GET',
            url: `https://api-sandbox.transfeera.com/pix/key/${idPix}`,
            headers: {
                accept: 'application/json',
                'User-Agent': emailUsuario,
                Authorization: `Bearer ${accessToken}`
            }
        };
        const statusResponse = yield axios.request(statusOptions);
        const keyRegistredStatus = statusResponse.data.status;
        console.log('STATUS DA CHAVE', statusResponse.data.status);
        const updatedStatus = keyRegistredStatus == 'REGISTRADA' ? 'REGISTRADA' : keyRegistredStatus;
        const updateResult = yield repository.put({
            id_pix: idPix,
            status: updatedStatus
        });
        if (!updateResult.data) {
            return {
                message: 'Erro ao atualizar chave',
                status: 500
            };
        }
        return {
            data: statusResponse.data,
            status: 200
        };
    }
    catch (error) {
        console.error('Error verifying PIX key:', error);
        // Pegando o erro vindo da API da Transfeera
        if (error.response && error.response.data) {
            return {
                message: error.response.data.message,
                status: error.response.data.statusCode || 500
            };
        }
        else {
            return {
                message: 'Erro interno do servidor',
                status: 500
            };
        }
    }
});
PixService.reenviarCodigo = (idPix, emailUsuario, accessToken) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // const accessToken = await authServiceAPI.returnAccessToken();
        const verifyOptions = {
            method: 'PUT',
            url: `https://api-sandbox.transfeera.com/pix/key/${idPix}/resendVerificationCode`,
            headers: {
                accept: 'application/json',
                'User-Agent': emailUsuario,
                authorization: `Bearer ${accessToken}`
            }
        };
        const verifyResponse = yield axios.request(verifyOptions);
        console.log('Verify Response:', verifyResponse.data);
        // Consultar o status após a verificação
        const statusOptions = {
            method: 'GET',
            url: `https://api-sandbox.transfeera.com/pix/key/${idPix}`,
            headers: {
                accept: 'application/json',
                'User-Agent': emailUsuario,
                Authorization: `Bearer ${accessToken}`
            }
        };
        const statusResponse = yield axios.request(statusOptions);
        const keyRegistredStatus = statusResponse.data.status;
        const updatedStatus = keyRegistredStatus === 'REGISTRADA' ? 'REGISTRADA' : keyRegistredStatus;
        const updateResult = yield repository.put({
            id_pix: idPix,
            status: updatedStatus
        });
        if (!updateResult.data) {
            return {
                message: 'Erro ao atualizar chave',
                status: 500
            };
        }
        return {
            data: statusResponse.data,
            status: 200
        };
    }
    catch (error) {
        console.error('Error verifying PIX key:', error);
        // Pegando o erro vindo da API da Transfeera
        if (error.response && error.response.data) {
            return {
                message: error.response.data.message,
                status: error.response.data.statusCode || 500
            };
        }
        else {
            return {
                message: 'Erro interno do servidor',
                status: 500
            };
        }
    }
});
PixService.deletarChave = (idPix, usuario_id, emailUsuario, accessToken) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const contasBancariasDisponiveis = yield contaBancosRepository.findOne({ idPix, usuario_id });
        if (!contasBancariasDisponiveis || !contasBancariasDisponiveis.data) {
            return {
                message: 'Conta bancária não encontrada ou inexistente',
                status: 404
            };
        }
        const contaBancosUsuarioID = contasBancariasDisponiveis.data.usuario_id;
        if (!contasBancariasDisponiveis) {
            return { message: contasBancariasDisponiveis.message, status: contasBancariasDisponiveis.status };
        }
        const contaBancosDelete = yield contaBancosRepository.deletePix(idPix, contaBancosUsuarioID);
        if (contaBancosDelete.status !== 200) {
            return {
                message: contaBancosDelete.message,
                status: contaBancosDelete.status
            };
        }
        const options = {
            method: 'DELETE',
            url: `https://api-sandbox.transfeera.com/pix/key/${idPix}`,
            headers: {
                accept: 'application/json',
                'User-Agent': emailUsuario,
                Authorization: `Bearer ${accessToken}`
            }
        };
        const response = yield axios.request(options);
        if (response && contaBancosDelete.status === 200) {
            return {
                data: contaBancosDelete.data,
                status: contaBancosDelete.status
            };
        }
        else {
            return {
                message: contaBancosDelete.message,
                status: contaBancosDelete.status
            };
        }
    }
    catch (error) {
        console.error(error);
        return {
            message: error.response ? error.response.data.message : 'Erro interno do servidor',
            status: error.response ? error.response.status : 500
        };
    }
});
PixService.buscarChaveId = (idPix, dadosUsuario, accessToken) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const emailUsuario = dadosUsuario.email;
        const usuario_id = dadosUsuario.id;
        const pixUser = yield repository.findByPixAndUserId(idPix, usuario_id);
        if (pixUser.status !== 200) {
            return {
                message: pixUser.message,
                status: pixUser.status
            };
        }
        const pixId = pixUser.data.Pix.id_pix;
        const options = {
            method: 'GET',
            url: `https:api-sandbox.transfeera.com/pix/key/${pixId}`,
            headers: {
                accept: 'application/json',
                'User-Agent': emailUsuario,
                authorization: `Bearer ${accessToken}`
            }
        };
        const response = yield axios.request(options);
        console.log('response: ', response.data);
        if (pixUser.status === 200) {
            return { data: response.data, status: pixUser.status };
        }
        else {
            return { message: pixUser.message, status: pixUser.status };
        }
    }
    catch (error) {
        console.error('Error finding PIX key:', error);
        //   Pegando o erro vindo da API da Transfeera
        if (error.response && error.response.data) {
            return {
                message: error.response.data.message,
                status: error.response.data.statusCode || 500
            };
        }
        else {
            return {
                message: 'Erro interno do servidor',
                status: 500
            };
        }
    }
});
;
module.exports = PixService;
