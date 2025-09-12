const Livro = require('../models/livro');
const Response = require('../utils/response')

const getAllLivros = (filtros = {}) => {
    try {
        const livros = Livro.findAll();
        return Response.success(livros, 200)
    }
    catch (err) {
        return Response.error(err.message);
    }
}


const getLivroById = (filtros) => {
    try {
        const livros = Livro.findById();
        return Response.success(livros, 200)
    }
    catch (err) {
        return Response.error(err.message);
    }
}


const createLivro = (filtros) => {
    try {
        const livros = Livro.findById();
        return Response.success(livros, 200)
    }
    catch (err) {
        return Response.error(err.message);
    }
}


const updateLivro = (filtros) => {
    try {
        const livros = Livro.findById();
        return Response.success(livros, 200)
    }
    catch (err) {
        return Response.error(err.message);
    }
}


const deleteLivro = (filtros) => {
    try {
        const livros = Livro.findById();
        return Response.success(livros, 200)
    }
    catch (err) {
        return Response.error(err.message);
    }
}

module.exports = {
    getAllLivros,
    getLivroById,
    createLivro,
    updateLivro,
    deleteLivro
}