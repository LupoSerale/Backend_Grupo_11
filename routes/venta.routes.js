const {Router} = require ('express');
const router = Router(); 
const {ventaController}= require("../controllers");
const { body } = require('express-validator');
router.get('/',ventaController.getVentas);

router.post('/', 
body('fecha', 'La fecha es requerida').exists(),
body('valor', 'El valor de la venta es requerida y debe ser numerico').exists().isNumeric(),
body('cantidadProd', 'la cantidad de Productos  es requerido y debe ser numerico').exists().isNumeric(),
body('documentoCLiente', 'el documento del cliente es requerido y debe ser numerico').exists().isNumeric(),
body('nombreCliente', 'El Nombre del cliente es requerido').exists(),
body('nombreVendedor', 'El Nombre del vendedor es requerido').exists(),
body('documentoVendedor', 'el documento del vendedor es requerido y debe ser numerico').exists().isNumeric(),
ventaController.createVenta);  

router.put('/:id', 
body('fecha', 'La fecha es requerida').exists(),
body('valor', 'El valor de la venta es requerida y debe ser numerico').exists().isNumeric(),
body('cantidadProd', 'la cantidad de Productos  es requerido y debe ser numerico').exists().isNumeric(),
body('documentoCLiente', 'el documento del cliente es requerido y debe ser numerico').exists().isNumeric(),
body('nombreCliente', 'El Nombre del cliente es requerido').exists(),
body('nombreVendedor', 'El Nombre del vendedor es requerido').exists(),
body('documentoVendedor', 'el documento del vendedor es requerido y debe ser numerico').exists().isNumeric(),
ventaController.updateVenta);

router.delete('/:id',  ventaController.deleteVenta);
  
module.exports = router;