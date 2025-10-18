const express = require('express');
const UserController = require('../controllers/userController');

const router = express.Router();

router.get('/escritores', UserController.getEscritores);
router.get('/:id', UserController.getUserById);
router.put('/:id', UserController.updateUser);

module.exports = router;
