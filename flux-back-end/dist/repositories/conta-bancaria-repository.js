const Conta = require('../models/conta-bancaria');
const Usuario = require('../models/usuario');
const Banco = require('../models/banco');

class ContaBancariaRepository {

    // listar contas bancarias  do usuario
    static get = async (usuario_id_TOKEN) => {


        // Lista todas as contas pertencente ao usário
        const contaEncontrada = await Conta.findAll({
            include: [
                {
                    model: Banco,
                    attributes: ['id_banco', 'name', 'image']
                }
            ],
            where: {
                usuario_id: usuario_id_TOKEN
            },

        });
        console.log(contaEncontrada);

        //  Verifica se a conta existe no banco
        if (!contaEncontrada) {
            return {
                message: 'Conta não encontrada ou inexistente',
                status: 404
            };
        }

        const res = contaEncontrada;

        return { data: res, status: 200 };

    }

    // cadastrar conta bancaria
    static post = async (body) => {
        console.log("Request Body:", body);
        const tipo_conta = body.tipo_conta.toUpperCase();
        const usuario = await Usuario.findByPk(body.fkUsuarioId);
        const banco = await Banco.findByPk(body.fkBancoId);
        console.log("Banco ID:", body.fkBancoId);

        if (!usuario) {
            return {
                message: `O usuário com o ID ${body.fkUsuarioId} não foi encontrado`,
                status: 404
            };

        }
        if (!banco) {
            return { message: "Banco não encontrado", status: 404 };
        }


        const res = await Conta.create({
            usuario_id: body.fkUsuarioId,
            banco_id: body.fkBancoId,
            saldo: body.saldo,
            tipo_conta: tipo_conta
        });

        return { data: res, status: 201 };
    }

    // atualizar conta bancaria do usuário
    static put = async (contaBancaria_id, novoSaldo, fkUsuarioId) => {

        const contaEncontrada = await Conta.findByPk(contaBancaria_id);

        if (!contaEncontrada) {
            return { message: 'Conta não encontrada', status: 404 };
        }

        const res = await contaEncontrada.update({ saldo: novoSaldo });

        return { data: res, status: 201 };

    }

    // deletar conta bancaria do usuário
    static delete = async (id, usuario_id_TOKEN) => {
        // Verifica se existe o usuario no banco e passado pelo token 
        const usuario_id = usuario_id_TOKEN
        const usuario = await Conta.findOne({ where: { usuario_id } });
        const banco = await Conta.findOne({ where: { usuario_id } });

        if (!usuario) {
            return {
                message: `Você ainda não possui uma conta bancaria para deleta-lá`,
                status: 404
            };

        }
        if (!banco) {
            return { message: "Banco não encontrado", status: 404 };
        }


        // Verifica se a conta existe no banco
        const contaEncontrada = await Conta.findOne({
            where: {
                id_conta: id,
                usuario_id: usuario_id
            }
        });
        if (!contaEncontrada) {
            return {
                message: 'Conta não encontrada ou inexistente',
                status: 404
            };
        }
        //  verifica se a conta pertence a um usuario
        if (contaEncontrada.usuario_id !== usuario_id) {
            return {
                message: 'Esta conta não pertence a você',
                status: 403
            };
        }
        await contaEncontrada.destroy();

        return {
            message: 'Conta deletada com sucesso.',
            status: 200
        }
    }
    // Buscar uma conta bancaira do usuário
    static findOne = async (body) => {

        const res = await Conta.findOne({
            where: {
                id_conta: body.contaBancaria_id,
                usuario_id: body.usuario_id
            }
        });

        if (!res) {
            return { message: "Você não possui contas bancarias registradas", status: 404 }
        }
        return { data: res, status: 200 };
    };
    // Buscar conta bancaira pelo PK dela
    static getById = async (id) => {
        const res = await Conta.findByPk(id);

        if (!res || res === null || res === undefined) {
            return { message: "Você não possui contas bancarias criadas", status: 404 }
        }
        return { data: res, status: 200 };
    };
}
module.exports = ContaBancariaRepository;