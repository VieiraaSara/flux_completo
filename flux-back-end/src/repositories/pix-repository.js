const { where } = require('sequelize');
const Pix = require('../models/pix');
const axios = require('axios');
const pixAuthService = require('../services/auth-transfeera-service');
const Usuario = require('../models/usuario');
const Banco = require('../models/banco');
const ContaBancos = require('../models/conta-bancos');
const { ContaBancaria } = require('../models');
require('dotenv').config();

class PixRepository {
    static get = async (usuario_ID_TOKEN) => {
        // Lista todas as contas pertencentes ao usuário

        const pixEncontrados = await ContaBancos.findAll({
            include: [
                {
                    model: Pix,
                    attributes: ['id_pix', 'key', 'key_type', 'created_at', 'status',]
                },
                {
                    model: ContaBancaria,
                    
                    include: [
                        {
                            model: Banco,
                            attributes: ['id_banco', 'name', 'image']
                        }
                    ],
                }
            ],

            where: {
                usuario_id: usuario_ID_TOKEN
            },
            attributes: []
        });
        // Verifica se a chave PIX foi encontrada no banco
        if (pixEncontrados.length === 0) {
            return {
                message: 'Pix não encontrada ou inexistente',
                status: 404
            };
        }

        return { data: pixEncontrados, status: 200 };
    }

    static post = async (body) => {
        try {
            const usuario = await Usuario.findByPk(body.usuario_id);


            const key_type = body.key_type.toUpperCase()

            if (!usuario) {
                return {
                    message: `O usuário não encontrado`,
                    status: 404
                };

            }

            // Cria a nova entrada na tabela Pix
            const pix = await Pix.create({
                id_pix: body.id_pix,
                key: body.key,
                key_type: key_type,
                usuario_id: body.usuario_id,
                created_at: new Date(),
                updated_at: new Date(),
                status: key_type == "CNPJ" || key_type == "CHAVE_ALEATORIA" ? "REGISTRADA" : "VALIDANDO"
            });

            if (!pix) {
                return { status: 400, message: 'Erro ao criar chave PIX' };
            }

            return { data: pix, status: 201 };
        } catch (error) {
            console.error('Error creating PIX entry:', error);
            return {
                message: "Falha ao criar criar chave PIX: " + error.message,
                status: 500
            };
        }
    }


    static findById = async (id) => {
        // Lista todas as contas pertencentes ao usuário
        const pixEncontrados = await Pix.findByPk({
            where: {
                usuario_id: id

            }
        });


        // Verifica se a chave PIX foi encontrada no banco
        if (pixEncontrados.length === 0) {
            return {
                message: 'Pix não encontrada ou inexistente',
                status: 404
            };
        }

        return { data: pixEncontrados, status: 200 };
    }

    static findByPixAndUserId = async (pixKey_id, usuario_id) => {
        // Procura todas as chaves pertencentes ao usuário
        const pixEncontrado = await ContaBancos.findOne({
            include: [
                {
                    model: Pix,
                    attributes: ['id_pix', 'key', 'key_type', 'created_at', 'status',]
                },
            ],
            where: {
                usuario_id: usuario_id
            },
            attributes: []
        });

        if (!pixEncontrado) {
            return {
                message: 'Chave Pix não encontrada ou inexistente',
                status: 404
            };
        }

        return { data: pixEncontrado, status: 200 };

    }

    static put = async (body) => {
        const updatePix = await Pix.update(
            {
                status:
                    body.status
            }, {
            where: {
                id_pix: body.id_pix
            }
        }
        );
        if (!updatePix) {
            return {
                message: 'Erro ao atualizar chave',
                status: 404
            };
        }
        return { data: updatePix, status: 200 };
    }

    static delete = async (idPix) => {
        const chaveDeletada = await Pix.destroy({
            where: {
                id_pix: idPix
            }
        });

        if (chaveDeletada === 0) {
            return {
                message: 'Chave não encontrada ou não autorizada para exclusão',
                status: 404
            };
        }

        return { status: 200 };
    }

    static findByKey = async (key) => {
        const chaveExistente = Pix.findOne({
            where: { key: key }
        });
        if (!chaveExistente) {
            return {
                message: 'Chave PIX fornecida já existe',
                status: 400
            };
        }
        return { data: chaveExistente, status: 200 };
    }
}



module.exports = PixRepository;


