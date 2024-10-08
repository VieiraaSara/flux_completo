const ContaBancaria = require('../models/conta-bancaria');
const Transacao = require('../models/transacao');
const Usuario = require('../models/usuario');
const repository = require('../repositories/conta-bancaria-repository');
const ContaBancosrepository = require('../repositories/conta-bancos-repository');
const sequelize = require('../config/database');

class ContaBancariaService {
    static criarContaBancaria = async (fkUsuarioId, fkBancoId,  saldo, tipo_conta) => {
        try {
            // Normaliza o tipo de conta
            const tipo_conta_normalizado = String(tipo_conta).trim().toUpperCase();
            console.log(tipo_conta_normalizado);
            // Validação do tipo de conta
            if (tipo_conta_normalizado !== "POUPANCA" && tipo_conta_normalizado !== "CORRENTE" && tipo_conta_normalizado !== "SALARIO") {
                return { message: "Tipo de conta bancária inválido", status: 400 };
            }

            // Criação da conta bancária
            const contaBancaria = await repository.post({
                fkUsuarioId,
                fkBancoId,
                tipo_conta: tipo_conta_normalizado,
                saldo
            });


            if (!contaBancaria.data) {
                return { message: contaBancaria.message, status: contaBancaria.status || 500 };
            }

            return { data: contaBancaria.data, status: 201 };
        } catch (error) {
            console.error("Erro ao criar conta bancária:", error);
            return {
                message: "Falha na requisição: " + error.message,
                status: 500
            };
        }
    }

    static atualizarSaldo = async (contaID, valor, fkUsuarioId, descricao, fkBancoId, contaBancos_id) => {
        const t = await sequelize.transaction();

        try {
            // Busca pela conta bancária
            const contaBancariaEncontrada = await ContaBancaria.findOne({
                where: {
                    id_conta: contaID,
                    usuario_id: fkUsuarioId
                }
            });

            if (!contaBancariaEncontrada) {
                await t.rollback();
                return { message: 'Conta não encontrada ou inexistente', status: 404 };
            }

            // Busca pelo usuário associado
            const usuario = await Usuario.findByPk(fkUsuarioId);

            if (!usuario) {
                await t.rollback();
                return { message: `Você ainda não possui uma conta bancária para atualizá-la`, status: 404 };
            }

            // Verificação de propriedade da conta
            if (contaBancariaEncontrada.usuario_id !== usuario.id_usuario) {
                await t.rollback();
                return { message: 'Esta conta já pertence a outro usuário', status: 403 };
            }

            // Busca pela conta no repositório
            const conta = await repository.getById(contaID);

            if (!conta) {
                await t.rollback();
                return { message: conta.message, status: conta.status || 500 };
            }

            const saldoAtual = parseFloat(conta.data.saldo);
            const novoSaldo = saldoAtual + parseFloat(valor);

            // Verificação de saldo insuficiente
            if (novoSaldo < 0) {
                await t.rollback();
                return { message: 'Você não possui saldo o suficiente em sua conta!', status: 400 };
            }

            // Atualização do saldo
            const saldoAtualizado = await repository.put(contaID, novoSaldo, fkUsuarioId);

            const tipoOperacao = valor >= 0 ? 'deposito' : 'retirada';

            // Criação de uma transação
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
            await t.rollback();
            console.error("Erro ao atualizar saldo:", error);
            return {
                message: "Falha na requisição: " + error.message,
                status: 500
            };
        }
    }
}

module.exports = ContaBancariaService;
