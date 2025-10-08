const livroService = require('../services/livroServices');

const getLivros = async (req, res) => {
    const filtros = req.params;
    try {
        const result = await livroService.getAllLivros(filtros)
        if (result.success) {
            return res.status(200).json(result.data)
        }
        return res.status(500).json({ error: result.error });
    }
    catch (err) {
        return res.status(500).json({ error: err });
    }
}

const getLivroById = async (req, res) => {
    const filtros = req.params;
    try {
        const result = await livroService.getLivroById(filtros.id)
        if (result.success) {
            return res.status(200).json(result.data)
        }
        return res.status(500).json({ error: result.error });
    }
    catch (err) {
        return res.status(500).json({ error: err });
    }
}

const createLivro = async (req, res) => {
    const filtros = req.body;
    try {
        const result = await livroService.createLivro(filtros)
        if (result.success) {
            return res.status(201).json(result.data)
        }
        return res.status(500).json({ error: result.error });
    }
    catch (err) {
        return res.status(500).json({ error: err });
    }
}

const updateLivro = async (req, res) => {
    const id = req.params.id;
    const dados = req.body;
    try {
        const result = await livroService.updateLivro(dados, id)
        if (result.success) {
            return res.status(200).json(result.data)
        }
        return res.status(500).json({ error: result.error });
    }
    catch (err) {
        return res.status(500).json({ error: err });
    }
}

const deleteLivro = async (req, res) => {
    const id = req.params.id;
    try {
        const result = await livroService.deleteLivro({ id })
        if (result.success) {
            return res.status(204).send()
        }
        return res.status(500).json({ error: result.error });
    }
    catch (err) {
        return res.status(500).json({ error: err });
    }
}

const countView = async (req, res) => {
    const id = req.params.id;

    if (!id) {
        return res.status(400).json({ error: 'ID do livro é obrigatório' });
    }

    try {
        const result = await livroService.countView(id);
        if (result.success) {
            return res.status(200).json(result.data);
        }
        return res.status(500).json({ error: result.error });
    }
    catch (err) {
        return res.status(500).json({ error: err });
    }
}

module.exports = {
    getLivros,
    getLivroById,
    createLivro,
    updateLivro,
    deleteLivro,
    countView
};