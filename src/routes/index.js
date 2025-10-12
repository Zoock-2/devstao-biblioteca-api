const express = require('express');
const router = express.Router();
const userRoutes = require('./userRoutes')
const authRoutes = require('./authRoutes')
const livroRotas = require('./livroRotas');
const votacaoRoutes = require('./votacaoRoutes');

router.use('/auth', authRoutes);
router.use('/users', userRoutes);
router.use('/livros', livroRotas);
router.use('/votacoes', votacaoRoutes);

module.exports = router;