const express = require('express');
const VotacaoController = require('../controllers/votacaoController');

const router = express.Router();

router.get('/', VotacaoController.getVotacoes);
router.get('/:id', VotacaoController.getVotacaoById);
router.post('/', VotacaoController.createVotacao);
router.put('/:id', VotacaoController.updateVotacao);
router.delete('/:id', VotacaoController.deleteVotacao);

router.get('/livro/:livro_id/rating', VotacaoController.getLivroRating);

module.exports = router;