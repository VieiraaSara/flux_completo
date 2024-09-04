const { where } = require('sequelize');
const Pix = require('../models/pix');
const axios = require('axios');
require('dotenv').config();

// {
//     "grant_type": "client_credentials",
//     "client_id": global.CLIENT_ID,
//     "client_secret": global.CLIENT_SECRET 
//   }

//   "access_token" -> get


class PixAuthService {
    static returnAccessToken = async () => {
        const body = {
            client_id: process.env.CLIENT_ID,
            client_secret: process.env.CLIENT_SECRET,
            grant_type: "client_credentials",
        };

        try {
            const response = await axios.post('https://login-api-sandbox.transfeera.com/authorization', body);
            if (response.data && response.data.access_token) {
                return response.data.access_token;
            } else {
                throw new Error('Failed to retrieve access token');
            }
        } catch (error) {
            console.error('Error obtaining access token:', error);
            throw error;
        }
    }
}

module.exports =  PixAuthService 
    
   



