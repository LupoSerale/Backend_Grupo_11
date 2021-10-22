//Importando el modelo de Base de datos de los productos
const UserSchema = require('../models/user');
//importando la libreria que nos permite capturar los errores en el cuerpo de la solicitudes
const { validationResult } = require('express-validator');
const bcrypt = require('bcrypt');


const getUsers = async (req, res) => {
    try {
        let users = await UserSchema.find().sort({descripcion: 1});
        res.status(200).json({ data: users });
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

const getUser = async (req, res) => {
    if (req.params.id != 'undefined') {
        try {
            let user = await UserSchema.findById(req.params.id);
            res.status(200).json({ data: user });
        }
        catch (err) {
            res.status(404).json({
                error: {
                    code: 404,
                    message: "Usuario no encontrado"
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


const createUser = async (req, res) => {
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
    let newUser = req.body
    let salt = await bcrypt.genSalt(10);
    newUser.password = await bcrypt.hash(newUser.password, salt);
    let user = new UserSchema(newUser);
    try {
        await user.save();
        res.status(201).json({ data: user });
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

const updateUser = async (req, res) => {
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
        let newUser = {
            id: req.params.id,
            fullName: req.body.fullName,
            email: req.body.email,
            password: req.body.password
        }
        await UserSchema.findByIdAndUpdate(req.params.id, newUser);
        res.status(201).json({ data: newUser })
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

const deleteUser = async (req, res) => {
    if (req.params.id != 'undefined') {
        try {
            let result = await UserSchema.findByIdAndRemove(req.params.id);
            res.status(200).json({ data: result });
        }
        catch (err) {
            res.status(404).json({
                error: {
                    code: 404,
                    message: "Usuario no encontrado"
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



module.exports.createUser = createUser;
module.exports.getUser = getUser;
module.exports.deleteUser = deleteUser;
module.exports.getUsers = getUsers;
module.exports.updateUser = updateUser;
