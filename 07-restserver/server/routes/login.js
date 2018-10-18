const express = require('express');
const app = express();
const Usuario = require('../models/usuario.js');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

app.post('/login', (req, res) => {

    let body = req.body;

    Usuario.findOne({ email: body.email }, (err, usuarioDB) => {

        if (err) {
            return res.status(500).json({
                ok: false,
                err
            });
        }

        if (!usuarioDB) {
            return res.json({
                ok: false,
                err: {
                    message: 'El USUARIO o contraseña son incorrectos'
                }

            });
        }


        if (!bcrypt.compareSync(body.password, usuarioDB.password)) {
            return res.json({
                ok: false,
                err: {
                    message: 'El usuario o CONTRASEÑA son incorrectos'
                }
            });
        }


        //Declaración del Token
        let token = jwt.sign({
            usuario: usuarioDB
        }, process.env.SEED, {expiresIn: process.env.CADUCIDAD_TOKEN});


        return res.json({
            ok: 'Logueado',
            usuario: usuarioDB,
            token: token
        })

    });



});




module.exports = app;