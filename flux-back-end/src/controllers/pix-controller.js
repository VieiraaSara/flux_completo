const axios = require('axios');
const repository = require('../repositories/pix-repository');
const authServiceAPI = require('../services/auth-transfeera-service');
const authService = require('../services/auth-service');
const pixService = require('../services/pix-service');


require('dotenv').config();

class PixController {
    static criarChave = async (req, res) => {
        try {
            const token = req.body.token || req.query.token || req.headers['x-access-token'];
            const dadosUsuario = await authService.decodeToken(token);
            const banco_id = req.body.banco_id
            const contaBancaria_id = req.body.conta_bancaria_id
            const { key_type, key } = req.body;


            const accessToken = await authServiceAPI.returnAccessToken();

            const response = await pixService.criarChave(
                key_type,
                key,
                dadosUsuario,
                accessToken,
                banco_id,
                contaBancaria_id);


            if (response.status === 201) {
                return res.status(response.status).send(response.data);
            } else {
                return res.status(response.status).send({ message: response.message });
            }

        } catch (error) {
            res.status(400).send({
                message: "Falha ao processar requisição: " + error
            })

        }
    }

    static verificarChave = async (req, res) => {
        try {
            const idPix = req.params.id;
            const verifyCode = req.body.code;

            const token = req.body.token || req.query.token || req.headers['x-access-token'];
            const dadosUsuario = await authService.decodeToken(token);
            const emailUsuario = dadosUsuario.email;

            const accessToken = await authServiceAPI.returnAccessToken();
            const response = await pixService.verificarChave(idPix, emailUsuario, accessToken, verifyCode);

            console.log(response.data);

            if (response.status === 200) {
                return res.status(200).send(response.data);
            } else {
                return res.status(response.status).send({ message: response.message });
            }

        } catch (error) {

            res.status(400).send({
                message: "Falha ao processar requisição: " + error
            })
        }

    }

    static reenviarCodigo = async (req, res) => {
        try {

            const idPix = req.params.id;


            const token = req.body.token || req.query.token || req.headers['x-access-token'];
            const dadosUsuario = await authService.decodeToken(token);
            const emailUsuario = dadosUsuario.email;

            const accessToken = await authServiceAPI.returnAccessToken();
            const response = await pixService.reenviarCodigo(idPix, emailUsuario, accessToken);

            console.log(response.data);

            if (response.status === 200) {
                return res.status(200).send(response.data);
            } else {
                return res.status(response.status).send({ message: response.message });
            }

        } catch (error) {

            res.status(400).send({
                message: "Falha ao processar requisição: " + error
            })
        }

    }

    static listarChavesPix = async (req, res) => {
        try {
            //Recupera o token
            const token = req.body.token || req.query.token || req.headers['x-access-token'];

            // Decodifica o token
            const dadosUsuario = await authService.decodeToken(token);

            const pix = await repository.get(dadosUsuario.id);

            if (pix.status === 200) {
                return res.status(pix.status).send(pix.data);
            } else {

                return res.status(pix.status).send({ message: pix.message });
            }

        } catch (error) {
            res.status(400).send({
                message: "Falha ao processar requisição: " + error
            })
        }

    }

    static buscarChavePixPorID = async (req, res) => {
        try {
            const idPix = req.params.id;

            const token = req.body.token || req.query.token || req.headers['x-access-token'];
            const dadosUsuario = await authService.decodeToken(token);

            const accessToken = await authServiceAPI.returnAccessToken();

            const response = await pixService.buscarChaveId(idPix, dadosUsuario, accessToken);


            if (response.status !== 200) {
                return res.status(response.status).send(response.message);
            }
            return res.status(response.status).send(response.data);

        } catch (error) {
            res.status(400).send({
                message: "Falha ao processar requisição: " + error
            })
        }
    }

    static deletarChave = async (req, res) => {
        try {
            const idPix = req.params.id;
            const token = req.body.token || req.query.token || req.headers['x-access-token'];

            // Decodifica o token
            const dadosUsuario = await authService.decodeToken(token);
            const usuario_id = dadosUsuario.id;
            const emailUsuario = dadosUsuario.email;
            const accessToken = await authServiceAPI.returnAccessToken();

            const response = await pixService.deletarChave(idPix, usuario_id, emailUsuario, accessToken);

            console.log(response.data);

            if (response.status === 200) {
                return res.status(response.status).json(response.data);
            } else {
                return res.status(response.status).send({ message: response.message });
            }

        } catch (error) {

            res.status(400).send({
                message: "Falha ao processar requisição: " + error
            })
        }
    }
}

module.exports = PixController;
