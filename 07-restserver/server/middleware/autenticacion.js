const jwt = require('jsonwebtoken');

let verificarToken = (req, res, next) => {

    let token = req.get('token_authentication');

    jwt.verify(token, process.env.SEED, (err, decoded) => {

        if (err) {
            return res.status(401).json({
                ok: false,
                err: {
                    message: 'El Token es Invalido'
                }
            });
        }

        req.usuario = decoded.usuario;
        next();

    });

}

module.exports = {
    verificarToken
}