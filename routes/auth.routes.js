const { Router } = require('express');
const router = Router();
const { body } = require('express-validator');
const { authController } = require('../controllers')

router.post('/login',
    body('email', 'el email es requerido y debe estar entre(6,100)caracteres')
        .exists()
        .isLength({ min: 5, max: 100 }),
    body('password', 'La contraseña es requerida y debe estar entre(8,16)caracteres')
        .isLength({ min: 8, max: 16 }),
        authController.login
)
module.exports = router;