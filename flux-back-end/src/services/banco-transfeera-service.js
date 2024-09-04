const { where } = require('sequelize');
const Pix = require('../models/pix');
const axios = require('axios');
const authServiceAPI = require('./auth-transfeera-service');
const authService = require('../services/auth-service')
require('dotenv').config();

class BancoService {
    static returnListBanks = async (USUARIO_TOKEN,nomeInstituicao) => {
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
            
     
            return response.data; // Retorna a lista de bancos

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