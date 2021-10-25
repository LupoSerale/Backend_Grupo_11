const { Router } = require('express');
const router = Router();
const { body } = require('express-validator');
const { productoController } = require('../controllers');
const verificarToken = require('../middlewares/verificarToken');

router.get('/:id', verificarToken, productoController.obtenerProducto);

router.get('/', productoController.obtenerProductos);

router.post('/',
    verificarToken,
    body('valor', 'El valor del producto es requerido y debe ser numerico').exists().isNumeric(),
    body('descripcion', 'La descripción del producto es requerida').exists(),
    body('estado', 'El estado del producto es requerido(true/false)').isBoolean().exists(),
    productoController.crearProducto);

router.put('/:id',
    verificarToken,
    body('valor', 'El valor del producto es requerido y debe ser numerico').exists().isNumeric(),
    body('descripcion', 'La descripción del producto es requerida').exists(),
    body('estado', 'El estado del producto es requerido(true/false)').isBoolean().exists(),
    productoController.actualizarProducto);

router.delete('/:id', verificarToken, productoController.eliminarProducto);

module.exports = router;