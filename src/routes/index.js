const express = require('express');
const router = express.Router();
const userRoutes = require('./userRoutes')
const authRoutes = require('./authRoutes')
const livroRotas = require('./livroRotas');
const votacaoRoutes = require('./votacaoRoutes');
const { upload } = require('../config/upload');
const LivroController = require('../controllers/livroController');
const autenticarJWT = require('../middlewares/authMiddleware');



router.post(
  '/livros',
  upload.fields([
    { name: 'arquivo_livro', maxCount: 1 },
    { name: 'capa', maxCount: 1 },
  ]),
  autenticarJWT,
  LivroController.createLivro
);

router.use('/auth', authRoutes);
router.use('/users', userRoutes);
router.use('/livros', livroRotas);
router.use('/votacoes', votacaoRoutes);

module.exports = router;