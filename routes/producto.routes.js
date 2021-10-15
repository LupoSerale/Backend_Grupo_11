const { Router } = require('express');
const router = Router();

router.get('/', (req, res) => {
    res.json({msg: "Todos los productos" });
})

router.post('/', (req, res) => {
    res.json({msg: "Producto ingresado" });
})

router.put('/', (req, res) => {
    res.json({msg: "Producto actualizado" });
})

router.delete('/', (req, res) => {
    res.json({msg: "Producto eliminado" });
})

module.exports = router;