const express = require('express');
const router = express.Router();
const userRoutes = require('./userRoutes')

const livroRotas = require('./livroRotas');

router.use('/auth',userRoutes);
router.use('/livros', livroRotas);

module.exports = router;