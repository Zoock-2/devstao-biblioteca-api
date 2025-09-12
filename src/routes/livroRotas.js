const express = require('express');
const LivroController = require('../controllers/LivroController');

const router = express.Router();

router.get('/', LivroController.getLivros);
router.get('/:id', LivroController.getLivroById);
router.post('/', LivroController.createLivro);
router.put('/', LivroController.updateLivro);
router.delete('/', LivroController.deleteLivro);

module.exports = router;