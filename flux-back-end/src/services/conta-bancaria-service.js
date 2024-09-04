const ContaBancaria = require('../models/conta-bancaria');
const Transacao = require('../models/transacao');
const Usuario = require('../models/usuario');

const repository = require('../repositories/conta-bancaria-repository');
const ContaBancosrepository = require('../repositories/conta-bancos-repository');
const sequelize = require('../config/database')

class ContaBancariaService {


    static criarContaBancaria = async (fkUsuarioId, fkBancoId, tipo_conta, saldo) => {
        try {

            if (tipo_conta !== "POUPANCA" && tipo_conta !== "CORRENTE" && tipo_conta !== "SALARIO") {
                return { message: "Tipo de conta bancária inválida", status: 400 }
            }


            const contaBancaria = await repository.post({ fkUsuarioId, fkBancoId, tipo_conta, saldo })


            if (!contaBancaria.data) {
                return { message: contaBancaria.message, status: contaBancaria.status }
            }

            return { data: contaBancaria.data, status: contaBancaria.status }

        } catch (error) {
            return {
                message: "Falha na requisição" + error,
                status: 500
            }
        }

    }

    static atualizarSaldo = async (contaID, valor, fkUsuarioId, descricao, fkBancoId, contaBancos_id) => {
        try {
            const t = await sequelize.transaction();
            const contaBancariaEncontrada = await ContaBancaria.findOne({
                where: {
                    id_conta: contaID,
                    usuario_id: fkUsuarioId
                }
            }
            );

            if (!contaBancariaEncontrada) {
                await t.rollback()
                return { message: 'Conta não encontrada ou inexistente', status: 404 };
            }

            const usuario = await Usuario.findByPk(fkUsuarioId);

            if (!usuario) {
                await t.rollback();
                return { message: `Você ainda não possui uma conta bancária para atualizá-la`, status: 404 };
            }


            if (contaBancariaEncontrada.usuario_id !== usuario.id_usuario) {
                await t.rollback();
                return { message: 'Esta conta já pertence a um usuário', status: 403 };
            }

            const conta = await repository.getById(contaID);


            if (!conta) {
                await t.rollback();
                return { message: conta.message, status: conta.status };
            }

            const saldoAtual = parseFloat(conta.data.saldo);

            const novoSaldo = saldoAtual + parseFloat(valor);


            if (novoSaldo < 0) {
                return { message: 'Você não possui saldo o suficiente em sua conta!', status: 400 };
            }

            const saldoAtualizado = await repository.put(contaID, novoSaldo, fkUsuarioId);
            const tipoOperacao = valor >= 0 ? 'deposito' : 'retirada';

            const transacao = await Transacao.create({
                conta_id: contaID,
                valor: valor,
                data_transacao: new Date(),
                tipo_operacao: tipoOperacao,
                descricao: descricao,
                usuario_id: fkUsuarioId,
                banco_id: fkBancoId,
                conta_flux_origem_id: contaBancos_id
            }, { transaction: t });

            await t.commit();


            return { data: saldoAtualizado.data.previous, status: 201 };


        } catch (error) {
            return {
                message: "Falha na requisição" + error,
                status: 500
            }
        }

    }


}

module.exports = ContaBancariaService;