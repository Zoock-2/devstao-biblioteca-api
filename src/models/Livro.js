const findAll = (filtros = {}) => {
    // Aplicar filtros
    const livros = [
        { id: 1, title: 'Dom Casmurro', author: 'Machado de Assis', year: 1899 },
        { id: 2, title: 'O Cortiço', author: 'Aluísio Azevedo', year: 1890 },
        { id: 3, title: 'Iracema', author: 'José de Alencar', year: 1865 }
    ];

    return livros;
}

const findById = (id) => {
    const livro = {};

    return livro;
}

const create = (request) => {
    const livro = {};

    return livro;
}

const update = (request, id) => {
    const livro = {};

    return livro;
}

const deleteRegister = (id) => {
    const livro = {};

    return livro;
}

module.exports = {
    findAll,
    findById,
    create,
    update,
    deleteRegister
}

