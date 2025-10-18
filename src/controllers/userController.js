const UserService = require('../services/userService');

const UserController = {
  async register(req, res) {
    try {
      const { nome, email, senha } = req.body;
      const user = await UserService.register({ nome, email, senha });
      return res.status(201).json({ mensagem: 'Usuário registrado com sucesso', user });
    } catch (err) {
      return res.status(400).json({ erro: err.message });
    }
  },

  async login(req, res) {
    try {
      const { email, senha } = req.body;
      const { token, nome, avatar_url } = await UserService.login({ email, senha });
      return res.json({ token, nome, avatar_url });
    } catch (err) {
      return res.status(401).json({ erro: err.message });
    }
  },

  // Busca todos os escritores
  async getEscritores(req, res) {
    try {
      const escritores = await UserService.getEscritores();
      return res.json(escritores);
    } catch (err) {
      return res.status(500).json({ erro: err.message });
    }
  },

  // Busca usuário por ID
  async getUserById(req, res) {
    try {
      const { id } = req.params;
      const user = await UserService.getUserById(id);
      return res.json(user);
    } catch (err) {
      return res.status(404).json({ erro: err.message });
    }
  },

  // Atualiza informações do usuário
  async updateUser(req, res) {
    try {
      const { id } = req.params;
      const { nome, email } = req.body;
      const userIdResqueted = req.user.id; // ID do usuário que esta fazendo a requisição

      // Precisamos verificar se o id da request vindo do JWT token é igual ao ID do parâmetro
      // Assim podemos evitar que um usuário faça atualização de outros usuários.
      if (parseInt(id, 10) !== userIdResqueted) {
        return res.status(403).json({ erro: 'Ação não permitida' });
      }

      const user = await UserService.updateUser(id, { nome, email });
      return res.json({ mensagem: 'Usuário atualizado com sucesso', user });
    } catch (err) {
      return res.status(400).json({ erro: err.message });
    }
  },

  // Upload de avatar
  async uploadAvatar(req, res) {
    try {
      const { id } = req.params;
      const userIdResqueted = req.user.id;

      if (parseInt(id, 10) !== userIdResqueted) {
        return res.status(403).json({ erro: 'Ação não permitida' });
      }

      if (!req.file) {
        return res.status(400).json({ erro: 'Nenhum arquivo enviado' });
      }

      const avatar_url = `${process.env.BASE_URL}/uploads/${req.file.filename}`;
      const user = await UserService.updateAvatar(id, avatar_url);
      return res.json({ mensagem: 'Avatar atualizado com sucesso', user });
    } catch (err) {
      return res.status(400).json({ erro: err.message });
    }
  },
};

module.exports = UserController;
