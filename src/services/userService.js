const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/user');

const JWT_SECRET = process.env.JWT_SECRET || 'umSecretforte';

const UserService = {
  async register({ nome, email, senha }) {
    const existingUser = await User.findByEmail(email);
    if (existingUser) {
      throw new Error('Email já cadastrado');
    }

    const senhaHash = await bcrypt.hash(senha, 10);
    return await User.create({ nome, email, senhaHash });
  },

  async login({ email, senha }) {
    const user = await User.findByEmail(email);
    if (!user) {
      throw new Error('Credenciais inválidas');
    }

    const match = await bcrypt.compare(senha, user.senha_hash);
    if (!match) {
      throw new Error('Credenciais inválidas');
    }

    const token = jwt.sign(
      { id: user.id, email: user.email, nome: user.nome },
      JWT_SECRET,
      { expiresIn: '1h' }
    );

    return { token, nome: user.nome };
  },

  // Busca todos os escritores
  async getEscritores() {
    return await User.findEscritores();
  },

  // Busca usuário por ID
  async getUserById(id) {
    const user = await User.findById(id);
    if (!user) {
      throw new Error('Usuário não encontrado');
    }
    return user;
  },

  // Atualiza informações do usuário
  async updateUser(id, { nome, email }) {
    const user = await User.findById(id);
    if (!user) {
      throw new Error('Usuário não encontrado');
    }

    if (email && email !== user.email) {
      const existingUser = await User.findByEmail(email);
      if (existingUser && existingUser.id !== parseInt(id)) {
        throw new Error('Email já está em uso');
      }
    }

    return await User.update(id, { nome, email });
  },

  // Atualiza avatar do usuário
  async updateAvatar(id, avatar_url) {
    const user = await User.findById(id);
    if (!user) {
      throw new Error('Usuário não encontrado');
    }

    return await User.update(id, { avatar_url });
  },
};

module.exports = UserService;
