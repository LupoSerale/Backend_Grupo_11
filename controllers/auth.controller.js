//Importando el modelo de Base de datos de los productos
const UserSchema = require('../models/user');
//importando la libreria que nos permite capturar los errores en el cuerpo de la solicitudes
const { validationResult } = require('express-validator');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const login = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        //si existen errores damos una respuesta erronea
        return res.status(403).json({
            error: {
                code: 403,
                msg: 'Usuario y/o contraseña invalidos'
            }
        });
    }
    const user = await UserSchema.findOne({ email: req.body.email });
    const validarPassword = await bcrypt.compare(req.body.password, user.password);
    if (!validarPassword) {
        return res.status(403).json({
            error: {
                code: 403,
                msg: 'Usuario y/o contraseña invalidos'
            }
        });
    }

    const token = jwt.sign(
        {
            id: user._id,
            email: user.email
        },
        'Backend_Grupo_11', 
        { expiresIn: '10h' }
    );

    return res.status(200).json({ token });

}

module.exports.login = login;