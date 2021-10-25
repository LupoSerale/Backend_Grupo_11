//primero llamamos a la ruta donde estan almacenados todos los productos
const ProductosSchema = require("../models/productos");
//definimos la funcion que va a verificar los productos que hay almacenados en la bd
//para esta solicitud usamos los parametros req, res y next
const verificacionProductos = async (req, res) => {
  //creamos la funcion que va a listar los productos
  let productos = await ProductosSchema.find();
  //creamos un forEach que recorra toda la lsita para hacer la comparacion de los productos registrados por el usuario con los productos qeu tenemos lamacenados en la base ed datos
  req.body.productos.forEach((item) => {
    //creamos un condicional if para hacer la validacion
    if (
      (productos.filter((producto) => producto.id == item.id), length === 0)
    ) {
      res.json({ msg: "el producto no existe" } + item.id);
    }
  });
  next();
};
module.exports = verificacionProductos;