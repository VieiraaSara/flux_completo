'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    // Criação da tabela banco
    await queryInterface.createTable('banco', {
      id_banco: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false
      },
      nome_banco: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true
      },
      descricao: {
        type: Sequelize.TEXT,
        allowNull: true
      }
    });

    // Criação da tabela usuario
    await queryInterface.createTable('usuario', {
      id_usuario: {
        type: Sequelize.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true
      },
      nome: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      cpf: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true
      },
      email: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true
      },
      senha: {
        type: Sequelize.STRING,
        allowNull: false
      },
      roles: {
        type: Sequelize.ENUM('usuario', 'admin'),
        allowNull: false
      },
      verifyCode: {
        type: Sequelize.INTEGER(6),
        allowNull: true,
      },
      status: {
        type: Sequelize.BOOLEAN,
        allowNull: true,
        defaultValue: 0
      }
    });

    // Criação da tabela conta
    await queryInterface.createTable('conta', {
      id_conta: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        allowNull: false,
        autoIncrement: true
      },
      usuario_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'usuario',
          key: 'id_usuario'
        },
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE'
      },
      banco_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'banco',
          key: 'id_banco'
        },
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE'
      },
      saldo: {
        type: Sequelize.DECIMAL(10, 5),
        allowNull: false,
        defaultValue: 0.00
      },
      tipo_conta: {
        type: Sequelize.ENUM('corrente', 'poupanca', 'salario'),
        defaultValue: "salario",
        allowNull: false
      }
    });

    // Criação da tabela pix
    await queryInterface.createTable('pix', {
      id_pix: {
        type: Sequelize.UUID,
        allowNull: false,
        primaryKey: true,
        defaultValue: Sequelize.UUIDV4
      },
      key: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true
      },
      key_type: {
        type: Sequelize.ENUM('EMAIL', 'CNPJ', 'TELEFONE', 'CHAVE_ALEATORIA'),
        allowNull: false
      },
      banco_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'banco',
          key: 'id_banco'
        },
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE'
      },
      created_at: {
        type: Sequelize.DATE,
        allowNull: false
      },
      updated_at: {
        type: Sequelize.DATE,
        allowNull: false
      },
      status: {
        type: Sequelize.ENUM('VALIDANDO','PENDENTE','REGISTRADA','ERRO'),
        allowNull: false
      }
    });

    // Criação da tabela conta_bancos
    await queryInterface.createTable('conta_bancos', {
      id_contaBancos: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        allowNull: false,
        autoIncrement: true,
      },
      pix_id: {
        type: Sequelize.UUID,
        allowNull: false,
        references: {
          model: 'pix',
          key: 'id_pix'
        },
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE'
      },
      usuario_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'usuario',
          key: 'id_usuario'
        },
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE'
      },
      contaBancaria_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'conta',
          key: 'id_conta'
        },
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE'
      },
      banco_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'banco',
          key: 'id_banco'
        },
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE'
      },
    });

    // Criação da tabela transacao
    await queryInterface.createTable('transacao', {
      id_transacao: {
        type: Sequelize.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true
      },
      contaBancos_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'conta_bancos',
          key: 'id_contaBancos'
        },
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE'
      },
      data_transacao: {
        type: Sequelize.DATE,
        allowNull: false
      },
      valor: {
        type: Sequelize.DECIMAL(10, 5),
        allowNull: false,
        defaultValue: 0.00
      },
      tipo_operacao: {
        type: Sequelize.ENUM('entrada', 'retirada'),
        allowNull: false
      },
      descricao: {
        type: Sequelize.TEXT,
        allowNull: false
      }
    });
  },

  down: async (queryInterface, Sequelize) => {
    // Desfaz a criação das tabelas na ordem reversa
    await queryInterface.dropTable('transacao');
    await queryInterface.dropTable('conta_bancos');
    await queryInterface.dropTable('pix');
    await queryInterface.dropTable('conta');
    await queryInterface.dropTable('usuario');
    await queryInterface.dropTable('banco');
  }
};
