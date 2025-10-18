const db = require('../config/database');

const findAll = async (filtros = {}) => {
    let query = 'SELECT * FROM votacoes WHERE 1=1';
    const params = [];

    if (filtros.livro_id) {
        query += ' AND livro_id = ?';
        params.push(filtros.livro_id);
    }

    if (filtros.usuario_id) {
        query += ' AND usuario_id = ?';
        params.push(filtros.usuario_id);
    }

    const [votacoes] = await db.execute(query, params);
    return votacoes;
}

// Busca uma votação específica pelo ID
const findById = async (id) => {
    const query = 'SELECT * FROM votacoes WHERE id = ?';
    const [votacoes] = await db.execute(query, [id]);
    return votacoes[0];
}

// Verifica se um usuário já votou em um livro específico
const findByUserAndBook = async (usuario_id, livro_id) => {
    const query = 'SELECT * FROM votacoes WHERE usuario_id = ? AND livro_id = ?';
    const [votacoes] = await db.execute(query, [usuario_id, livro_id]);
    return votacoes[0];
}

// Cria um novo registro de votação no banco de dados
const create = async (request) => {
    const query = `
        INSERT INTO votacoes
        (nota, usuario_id, livro_id)
        VALUES (?, ?, ?)
    `;

    const params = [
        request.nota,
        request.usuario_id,
        request.livro_id
    ];

    const [result] = await db.execute(query, params);
    return findById(result.insertId);
}

// Atualiza os dados de uma votação existente
const update = async (request, id) => {
    const query = `
        UPDATE votacoes
        SET estrelas = ?
        WHERE id = ?
    `;

    await db.execute(query, [request.estrelas, id]);
    return findById(id);
}

// Exclui uma votação
const deleteRegister = async (id) => {
    const query = 'DELETE FROM votacoes WHERE id = ?';
    await db.execute(query, [id]);
    return { id };
}

// Calcula a média de estrelas para um livro específico
const getBookRating = async (livro_id) => {
    const query = `
        SELECT AVG(estrelas) as media_estrelas, COUNT(*) as total_votos
        FROM votacoes
        WHERE livro_id = ?
    `;
    const [result] = await db.execute(query, [livro_id]);
    return result[0];
}

module.exports = {
    findAll,
    findById,
    findByUserAndBook,
    create,
    update,
    deleteRegister,
    getBookRating
}