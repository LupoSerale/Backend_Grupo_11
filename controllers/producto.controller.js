//Importando el modelo de Base de datos de los productos
const ProductoSchema = require('../models/producto');
//importando la libreria que nos permite capturar los errores en el cuerpo de la solicitudes
const { validationResult } = require('express-validator');

const obtenerProductos = async (req, res) => {
    try {
        let productos = await ProductoSchema.find().sort({descripcion: 1});
        res.status(200).json({ data: productos });
    }
    catch (err) {
        res.status(404).json({
            error: {
                code: 404,
                message: "Problemas con la base de datos" + err.message
            }
        })
    }
}

const obtenerProducto = async (req, res) => {
    if (req.params.id != 'undefined') {
        try {
            let producto = await ProductoSchema.findById(req.params.id);
            res.status(200).json({ data: producto });
        }
        catch (err) {
            res.status(404).json({
                error: {
                    code: 404,
                    message: "Producto no encontrado"
                }
            })
        }
    } else {
        res.status(404).json({
            error: {
                code: 404,
                message: "Id no encontrado"
            }
        })
    }
}

const crearProducto = async (req, res) => {
    //verificando que si hay errores en los parametros de la solictud
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        //si existen errores damos una respuesta erronea
        return res.status(400).json({
            error: {
                code: 404,
                errors: errors.array()
            }
        });
    }
    let producto = new ProductoSchema(req.body);
    try {
        await producto.save();
        res.status(201).json({ data: producto });
    }
    catch (err) {
        res.status(404).json({
            error: {
                code: 404,
                message: "Problemas con la base de datos" + err.message
            }
        })
    }
}

const actualizarProducto = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({
            error: {
                code: 404,
                errors: errors.array()
            }
        });
    }
    try {
        let nuevoProducto = {
            id: req.params.id,
            valor: req.body.valor,
            descripcion: req.body.descripcion,
            estado: req.body.estado
        }
        await ProductoSchema.findByIdAndUpdate(req.params.id, nuevoProducto);
        res.status(201).json({ data: nuevoProducto })
    }
    catch (err) {
        res.status(404).json({
            error: {
                code: 404,
                message: "Id no encontrado"
            }
        })
    }
}

const eliminarProducto = async (req, res) => {
    if (req.params.id != 'undefined') {
        try {
            let resultado = await ProductoSchema.findByIdAndRemove(req.params.id);
            res.status(200).json({ data: resultado });
        }
        catch (err) {
            res.status(404).json({
                error: {
                    code: 404,
                    message: "Producto no encontrado"
                }
            })
        }
    } else {
        res.status(404).json({
            error: {
                code: 404,
                message: "Id no encontrado"
            }
        })
    }
}

module.exports.obtenerProductos = obtenerProductos;
module.exports.obtenerProducto = obtenerProducto;
module.exports.crearProducto = crearProducto;
module.exports.actualizarProducto = actualizarProducto;
module.exports.eliminarProducto = eliminarProducto;