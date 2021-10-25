const jwt = require('jsonwebtoken');

const verificarToken = async (req, res, next) => {
    const token = req.header('auth-token');
    if (!token) {
        return res.status(403).json({
            error: {
                code: 403,
                msg: 'Usuario no autorizado'
            }
        });
    }
    try {
        const verificar = jwt.verify(token, 'Backend_Grupo_11');
        next();
    }
    catch (err) {
        return res.status(403).json({
            error: {
                code: 403,
                msg: 'Usuario no autorizado'
            }
        });
    }
    
}

module.exports = verificarToken;