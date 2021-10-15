const ProductoSchema = require('../models/producto');

const obtenerProductos = async (req, res) => {
    try {
        let productos = await ProductoSchema.find();
        res.json({ productos });
    }
    catch (err) {
        console.log(err);
    }
}

const obtenerProducto = async (req, res) => {
    if (typeof req.body != 'undefined') {
        try {
            let producto = await ProductoSchema.findById(req.body.id);
            res.json({ producto });
        }
        catch (err) {
            console.log(err);
        }
    } else {
        res.json({ msg: 'No se puede obtener el producto sin el id' });
    }
}

const crearProducto = async (req, res) => {
    if (typeof req.body != 'undefined') {
        console.log(console.log(req.body))
        let producto = new ProductoSchema(req.body);
        try {
            await producto.save();
            res.json({ msg: 'Se ha ingresado el producto ' + producto.id });
        }
        catch (err) {
            console.log(err);
        }
    } else {
        res.json({ msg: 'Revise su configuración' });
    }

}

const actualizarProducto = async(req, res) => {
    if (typeof req.body != 'undefined') {
        try {
            await ProductoSchema.findByIdAndUpdate(
                req.body._id, 
                {
                    description: req.body.description,
                    valor: req.body.valor,
                    estado: req.body.estado
                });
            res.json({ msg: 'Se actualizó el producto ' + req.body._id });
        }
        catch (err) {
            console.log(err);
        }
    } else {
        res.json({ msg: 'No se puede actualizar el producto' });
    }
}

const eliminarProducto = async (req, res) => {
    if (typeof req.body != 'undefined') {
        try {
            await ProductoSchema.findByIdAndDelete(req.body.id);
            res.json({ msg: 'Se ha eliminado el producto ' + req.body.id});
        }
        catch (err) {
            console.log(err);
        }
    } else {
        res.json({ msg: 'No se pudo eliminar el producto ' + req.body.id });
    }
}

module.exports.obtenerProductos = obtenerProductos;
module.exports.obtenerProducto = obtenerProducto;
module.exports.crearProducto = crearProducto;
module.exports.actualizarProducto = actualizarProducto;
module.exports.eliminarProducto = eliminarProducto;