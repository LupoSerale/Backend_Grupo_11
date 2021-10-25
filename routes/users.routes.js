const { Router } = require('express');
const router = Router();
const { body } = require('express-validator');
const { usersController } = require('../controllers');
const verificarToken = require('../middlewares/verificarToken');

router.get('/:id', verificarToken, usersController.getUser);

router.get('/', verificarToken, usersController.getUsers);

router.post('/',
    body('fullName', 'El nombre es requerido y debe estar entre(6,100)caracteres')
        .exists()
        .isLength({ min: 5, max: 100 }),
    body('email', 'el email es requerido y debe estar entre(6,100)caracteres')
        .exists()
        .isLength({ min: 5, max: 100 }),
    body('password', 'La contraseña es requerida y debe estar entre(8,16)caracteres')
        .isLength({ min: 8, max: 16 }),
    usersController.createUser);

router.put('/:id',
    verificarToken,
    body('fullName', 'El nombre es requerido y debe estar entre(6,100)caracteres')
        .exists()
        .isLength({ min: 5, max: 100 }),
    body('email', 'el email es requerido y debe estar entre(6,100)caracteres')
        .exists()
        .isLength({ min: 5, max: 100 }),
    body('password', 'La contraseña es requerida y debe estar entre(8,16)caracteres')
        .isLength({ min: 8, max: 16 }),
    usersController.updateUser);

router.delete('/:id',
    verificarToken,
    usersController.deleteUser);

module.exports = router;