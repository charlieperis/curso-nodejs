const jwt = require('jsonwebtoken');

//VERIFICACION DE TOKEN

let verificarToken = (req, res, next) => {

    let token = req.get('token_auth'); // eso se pasa por el header, el parametro 'token_auth' y el valor es el token del usuario aue se obtiene del login

    jwt.verify(token, process.env.SEED, (err, decoded) => {

        if (err) {
            return res.status(401).json({
                ok: false,
                err: {
                    message: 'El Token no es válido'
                }
            });
        }

        req.usuario = decoded.usuario;
        next();

    });
}




//VERIFICACION DE TOKEN DE IMAGEN

let verificarTokenImg = (req, res, next) => {

    let token = req.query.token; // eso se pasa por la URL, el parametro 'token_auth' y el valor es el token del usuario aue se obtiene del login

    jwt.verify(token, process.env.SEED, (err, decoded) => {

        if (err) {
            return res.status(401).json({
                ok: false,
                err: {
                    message: 'El Token no es válido'
                }
            });
        }

        req.usuario = decoded.usuario;
        next();

    });
}




//VERIFICACION DE ADMIN ROL

let verificarAdminRole = (req, res, next) => {

    let usuario = req.usuario;

    if (usuario.role === 'ADMIN_ROLE') {
        next();
    } else {
        return res.json({
            ok: false,
            err: {
                mensaje: 'Este usuario no es Admin'
            }
        });
    }
};


module.exports = {
    verificarToken,
    verificarAdminRole,
    verificarTokenImg
}