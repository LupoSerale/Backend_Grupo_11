const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ProductoSchema = Schema({
    descripcion : String,
    valor : Number,    
    estado : Boolean
})

module.exports = mongoose.model('Producto',ProductoSchema);