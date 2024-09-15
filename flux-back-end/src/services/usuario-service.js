const Usuario = require('../models/usuario');
const repository = require('../repositories/usuario-repository');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

class UsuarioService {

    static generateVerifyCode() {
        let code = Math.floor(Math.random() * 1000000);

        return parseInt(code.toString().padStart(6, 0));
    }

    static get = async (id_usuario) => {

        const listUsuarios = await repository.get(id_usuario);

         if (!listUsuarios) {
             return { message: 'Sem usuários encontrados', status: 400 };
         }

        return { data: listUsuarios, status: 200 };

    }

    static getById = async (id) => {

        const usuario = await repository.getById(id);


        if (!usuario.data) {
            return { message: usuario.message, status: usuario.status };
        }

        return { data: usuario.data, status: usuario.status };
    }

    static create = async (nome, cpf, email, senha) => {
        try {
            const verifyCode = this.generateVerifyCode();

            const cpfExistente = await Usuario.findOne({ where: { cpf: cpf } });
            const emailExistente = await Usuario.findOne({ where: { email: email } });

            if (cpfExistente) {
                return { message: 'Este CPF já pertence a outro usuário', status: 403 };
            }

            if (emailExistente) {
                return { message: 'Este email já pertence a outro usuário', status: 403 };
            }

            const hashedPassword = await bcrypt.hash(senha, 10);

            const usuario = await repository.post({
                nome: nome,
                cpf: cpf,
                email: email,
                senha: hashedPassword,
                roles: "usuario",
                verifyCode: verifyCode
            });

            if (usuario.status !== 201) {
                return { message: usuario.message, status: usuario.status };
            }

            return { data: usuario.data, status: 201 };

        } catch (error) {
            console.error('Erro ao criar usuário no serviço:', error);
            return { message: 'Erro ao criar usuário', status: 500 };
        }
    }

    static update = async (id, body) => {
        try {
            const senha = body.senha;


            const hashedPassword = await bcrypt.hash(senha, 10);

            const usuario = await repository.put(id, {
                nome: body.nome,
                cpf: body.cpf,
                email: body.email,
                senha: hashedPassword

            });

            if (usuario.status !== 201) {
                return { message: usuario.message, status: usuario.status };
            }

            return { data: usuario.data, status: 201 };

        } catch (error) {
            console.error('Erro ao criar usuário no serviço:', error);
            return { message: 'Erro ao atualizar usuário', status: 500 };
        }
    }

}

module.exports = UsuarioService;

