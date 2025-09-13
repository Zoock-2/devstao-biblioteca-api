const express = require('express');
const router = express.Router();
// const userRoutes = require('./userRoutes'); // exemplo futuro

const livroRotas = require('./livroRotas');

router.use('/livros', livroRotas);
// router.use('/users', userRoutes);

module.exports = router;