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
const Pix = require('../models/pix');
const axios = require('axios');
const authServiceAPI = require('./auth-transfeera-service');
const authService = require('../services/auth-service');
const bancoRepository = require('../repositories/banco-repository');
require('dotenv').config();
class BancoService {
}
_a = BancoService;
BancoService.returnListBanks = (USUARIO_TOKEN, nomeInstituicao) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // const accessToken = await authServiceAPI.returnAccessToken();
        // const options = {
        //     method: 'GET',
        //     url: `https://api-sandbox.transfeera.com/bank?pix=true`,
        //     headers: {
        //         accept: 'application/json',
        //         'content-type': 'application/json',
        //         'user-Agent': USUARIO_TOKEN.email,
        //         Authorization: `Bearer ${accessToken}`
        //     }
        // };
        // Faz a requisição para a API
        // const response = await axios.request(options);
        const res = yield bancoRepository.get();
        if (res) {
            return { data: res.data, status: res.status };
        }
        // return response.data; // Retorna a lista de bancos
    }
    catch (error) {
        console.error('Error obtaining list of banks:', error);
        throw error;
    }
});
BancoService.cadastrarInstituicoes = (USUARIO_TOKEN) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const accessToken = yield authServiceAPI.returnAccessToken();
        const options = {
            method: 'GET',
            url: `https://api-sandbox.transfeera.com/bank?pix=true`,
            headers: {
                accept: 'application/json',
                'content-type': 'application/json',
                'user-Agent': USUARIO_TOKEN.email,
                Authorization: `Bearer ${accessToken}`
            }
        };
        // Faz a requisição para a API
        const response = yield axios.request(options);
        let bancos = response.data;
        const cadastrandoBancos = yield Promise.all(bancos.map((banco) => __awaiter(void 0, void 0, void 0, function* () {
            const { id, name, code = 'DEFAULT_CODE', ispb, image, spi_participant_type } = banco;
            if (!name || !ispb || !spi_participant_type) {
                throw new Error(`Dados inválidos para o banco com id ${id}`);
            }
            return bancoRepository.post({
                id,
                name,
                code,
                ispb,
                image,
                spi_participant_type
            });
        })));
        return bancos;
    }
    catch (error) {
        console.error('Error obtaining list of banks:', error);
        throw error;
    }
});
BancoService.findBankById = (banks, bankId) => {
    return banks.find(bank => bank.id === bankId);
};
module.exports = BancoService;
