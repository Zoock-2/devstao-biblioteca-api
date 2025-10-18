const express = require('express');
const router = express.Router();
const userRoutes = require('./userRoutes')
const authRoutes = require('./authRoutes')
const livroRotas = require('./livroRotas');
const votacaoRoutes = require('./votacaoRoutes');
const { upload } = require('../config/upload');
const LivroController = require('../controllers/livroController');
const UserController = require('../controllers/userController');
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

router.post(
  '/users/:id/avatar',
  upload.single('avatar'),
  autenticarJWT,
  UserController.uploadAvatar
);

router.use('/auth', authRoutes);
router.use('/users', autenticarJWT, userRoutes);
router.use('/livros', autenticarJWT, livroRotas);
router.use('/votacoes', autenticarJWT, votacaoRoutes);

module.exports = router;