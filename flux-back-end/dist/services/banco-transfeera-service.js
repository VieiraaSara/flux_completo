const { where } = require('sequelize');
const Pix = require('../models/pix');
const axios = require('axios');
const authServiceAPI = require('./auth-transfeera-service');
const authService = require('../services/auth-service');
const bancoRepository = require('../repositories/banco-repository');
require('dotenv').config();

class BancoService {
    static returnListBanks = async (USUARIO_TOKEN, nomeInstituicao) => {
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
            const res = await bancoRepository.get();
            if (res) {
                return { data: res.data, status: res.status }
            }
            // return response.data; // Retorna a lista de bancos

        } catch (error) {
            console.error('Error obtaining list of banks:', error);
            throw error;
        }
    }
    static cadastrarInstituicoes = async (USUARIO_TOKEN) => {
        try {
            const accessToken = await authServiceAPI.returnAccessToken();
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
            const response = await axios.request(options);
            let bancos = response.data;
            const cadastrandoBancos = await Promise.all(bancos.map(async banco => {

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
            }));
            return bancos;
        } catch (error) {
            console.error('Error obtaining list of banks:', error);
            throw error;
        }
    }
    static findBankById = (banks, bankId) => {
        return banks.find(bank => bank.id === bankId);
    }
}

module.exports = BancoService;