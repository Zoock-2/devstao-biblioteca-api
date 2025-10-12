const Votacao = require('../models/Votacao');
const Response = require('../utils/response');

const getAllVotacoes = async (filtros = {}) => {
    try {
        const votacoes = await Votacao.findAll(filtros);
        return Response.success(votacoes, 200);
    }
    catch (err) {
        return Response.error(err.message);
    }
}

const getVotacaoById = async (id) => {
    try {
        const votacao = await Votacao.findById(id);
        if (!votacao) {
            return Response.error('Votação não encontrada', 404);
        }
        return Response.success(votacao, 200);
    }
    catch (err) {
        return Response.error(err.message);
    }
}

const createVotacao = async (dadosVotacao) => {
    try {
        // Verifica se o usuário já votou neste livro
        const votacaoExistente = await Votacao.findByUserAndBook(
            dadosVotacao.usuario_id,
            dadosVotacao.livro_id
        );

        if (votacaoExistente) {
            return Response.error('Usuário já votou neste livro', 400);
        }

        // Valida a quantidade de estrelas (entre 1 e 5)
        if (dadosVotacao.estrelas < 1 || dadosVotacao.estrelas > 5) {
            return Response.error('A quantidade de estrelas deve ser entre 1 e 5', 400);
        }

        const votacao = await Votacao.create(dadosVotacao);
        return Response.success(votacao, 201);
    }
    catch (err) {
        return Response.error(err.message);
    }
}

const updateVotacao = async (dadosVotacao, id) => {
    try {
        const votacaoExiste = await Votacao.findById(id);

        if (!votacaoExiste) {
            return Response.error('Votação não encontrada', 404);
        }

        // Valida a quantidade de estrelas (entre 1 e 5)
        if (dadosVotacao.estrelas < 1 || dadosVotacao.estrelas > 5) {
            return Response.error('A quantidade de estrelas deve ser entre 1 e 5', 400);
        }

        const votacaoAtualizada = await Votacao.update(dadosVotacao, id);
        return Response.success(votacaoAtualizada, 200);
    }
    catch (err) {
        return Response.error(err.message);
    }
}

const deleteVotacao = async (id) => {
    try {
        const votacaoExiste = await Votacao.findById(id);
        if (!votacaoExiste) {
            return Response.error('Votação não encontrada', 404);
        }

        await Votacao.deleteRegister(id);
        return Response.success({ message: 'Votação excluída com sucesso' }, 200);
    }
    catch (err) {
        return Response.error(err.message);
    }
}

const getLivroRating = async (livro_id) => {
    try {
        const rating = await Votacao.getBookRating(livro_id);
        return Response.success(rating, 200);
    }
    catch (err) {
        return Response.error(err.message);
    }
}

module.exports = {
    getAllVotacoes,
    getVotacaoById,
    createVotacao,
    updateVotacao,
    deleteVotacao,
    getLivroRating
};