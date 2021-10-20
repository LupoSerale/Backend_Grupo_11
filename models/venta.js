const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const VentasSchema = Schema ({
    fecha: String,
    valor: Number,
    cantidadProd: Number,
    documentoCLiente: Number,
    nombreCliente: String, 
    nombreVendedor: String,
    documentoVendedor: Number
    
})

module.exports = mongoose.model ('venta', VentasSchema);