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
require('dotenv').config();
// {
//     "grant_type": "client_credentials",
//     "client_id": global.CLIENT_ID,
//     "client_secret": global.CLIENT_SECRET 
//   }
//   "access_token" -> get
class PixAuthService {
}
_a = PixAuthService;
PixAuthService.returnAccessToken = () => __awaiter(void 0, void 0, void 0, function* () {
    const body = {
        client_id: process.env.CLIENT_ID,
        client_secret: process.env.CLIENT_SECRET,
        grant_type: "client_credentials",
    };
    try {
        const response = yield axios.post('https://login-api-sandbox.transfeera.com/authorization', body);
        if (response.data && response.data.access_token) {
            return response.data.access_token;
        }
        else {
            throw new Error('Failed to retrieve access token');
        }
    }
    catch (error) {
        console.error('Error obtaining access token:', error);
        throw error;
    }
});
module.exports = PixAuthService;
