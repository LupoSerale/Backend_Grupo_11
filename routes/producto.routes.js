const { Router } = require('express');
const router = Router();
const { productoController } = require('../controllers');

router.get('/', productoController.obtenerProducto);

router.post('/', productoController.crearProducto);

router.put('/', productoController.actualizarProducto);

router.delete('/', productoController.eliminarProducto);

module.exports = router;