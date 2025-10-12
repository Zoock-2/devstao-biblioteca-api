const votacaoService = require('../services/votacaoServices');

const getVotacoes = async (req, res) => {
    const filtros = req.query;
    try {
        const result = await votacaoService.getAllVotacoes(filtros);
        if (result.success) {
            return res.status(200).json(result.data);
        }
        return res.status(result.status || 500).json({ error: result.error });
    }
    catch (err) {
        return res.status(500).json({ error: err.message });
    }
}

const getVotacaoById = async (req, res) => {
    const { id } = req.params;
    try {
        const result = await votacaoService.getVotacaoById(id);
        if (result.success) {
            return res.status(200).json(result.data);
        }
        return res.status(result.status || 500).json({ error: result.error });
    }
    catch (err) {
        return res.status(500).json({ error: err.message });
    }
}

const createVotacao = async (req, res) => {
    const dados = req.body;

    // Validação básica dos dados necessários
    if (!dados.estrelas || !dados.usuario_id || !dados.livro_id) {
        return res.status(400).json({
            error: 'Dados incompletos. Estrelas, ID do usuário e ID do livro são obrigatórios.'
        });
    }

    try {
        const result = await votacaoService.createVotacao(dados);
        if (result.success) {
            return res.status(201).json(result.data);
        }
        return res.status(result.status || 500).json({ error: result.error });
    }
    catch (err) {
        return res.status(500).json({ error: err.message });
    }
}

const updateVotacao = async (req, res) => {
    const { id } = req.params;
    const dados = req.body;

    if (!dados.estrelas) {
        return res.status(400).json({
            error: 'A quantidade de estrelas é obrigatória para atualização.'
        });
    }

    try {
        const result = await votacaoService.updateVotacao(dados, id);
        if (result.success) {
            return res.status(200).json(result.data);
        }
        return res.status(result.status || 500).json({ error: result.error });
    }
    catch (err) {
        return res.status(500).json({ error: err.message });
    }
}

const deleteVotacao = async (req, res) => {
    const { id } = req.params;
    try {
        const result = await votacaoService.deleteVotacao(id);
        if (result.success) {
            return res.status(204).send();
        }
        return res.status(result.status || 500).json({ error: result.error });
    }
    catch (err) {
        return res.status(500).json({ error: err.message });
    }
}

const getLivroRating = async (req, res) => {
    const { livro_id } = req.params;

    if (!livro_id) {
        return res.status(400).json({
            error: 'ID do livro é obrigatório para consultar a avaliação.'
        });
    }

    try {
        const result = await votacaoService.getLivroRating(livro_id);
        if (result.success) {
            return res.status(200).json(result.data);
        }
        return res.status(result.status || 500).json({ error: result.error });
    }
    catch (err) {
        return res.status(500).json({ error: err.message });
    }
}

module.exports = {
    getVotacoes,
    getVotacaoById,
    createVotacao,
    updateVotacao,
    deleteVotacao,
    getLivroRating
};