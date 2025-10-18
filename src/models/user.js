const db = require('../config/database');

const User = {
  //Busca usuário pelo e-mail
  async findByEmail(email) {
    const [rows] = await db.execute('SELECT * FROM users WHERE email = ?', [email]);
    return rows[0];
  },
  //insere user no DB
  async create({ nome, email, senhaHash }) {
    const [result] = await db.execute(
      'INSERT INTO users (nome, email, senha_hash) VALUES (?, ?, ?)',
      [nome, email, senhaHash]
    );
    return { id: result.insertId, nome, email };
  },

  // Busca todos os escritores
  async findEscritores() {
    const [rows] = await db.execute('SELECT DISTINCT u.id, u.nome, u.avatar_url FROM users u JOIN livros l on l.usuario_id = u.id');
    return rows;
  },

  // Busca usuário por ID
  async findById(id) {
    const [rows] = await db.execute('SELECT id, nome, email, avatar_url FROM users WHERE id = ?', [id]);
    return rows[0];
  },

  // Atualiza informações do usuário
  async update(id, { nome, email, avatar_url }) {
    const updates = [];
    const values = [];

    if (nome !== undefined) {
      updates.push('nome = ?');
      values.push(nome);
    }
    if (email !== undefined) {
      updates.push('email = ?');
      values.push(email);
    }
    if (avatar_url !== undefined) {
      updates.push('avatar_url = ?');
      values.push(avatar_url);
    }

    if (updates.length === 0) {
      return null;
    }

    values.push(id);
    const query = `UPDATE users SET ${updates.join(', ')} WHERE id = ?`;
    await db.execute(query, values);
    
    return await this.findById(id);
  },
};

module.exports = User;
