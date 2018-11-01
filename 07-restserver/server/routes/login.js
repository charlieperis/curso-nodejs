const express = require('express');
const app = express();
const Usuario = require('../models/usuario.js');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const { OAuth2Client } = require('google-auth-library');
const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);

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
        }, process.env.SEED, { expiresIn: process.env.CADUCIDAD_TOKEN });


        return res.json({
            ok: 'Logueado',
            usuario: usuarioDB,
            token: token
        })

    });


});


/*Configuraciones de Google Sing In*/

async function verify(token) {
    const ticket = await client.verifyIdToken({
        idToken: token,
        audience: process.env.GOOGLE_CLIENT_ID,  // Specify the CLIENT_ID of the app that accesses the backend
        // Or, if multiple clients access the backend:
        //[CLIENT_ID_1, CLIENT_ID_2, CLIENT_ID_3]
    });
    const payload = ticket.getPayload();
    const userid = payload['sub'];

    return {
        nombre: payload.name,
        email: payload.email,
        img: payload.picture,
        google: true
    }
}


app.post('/google', async (req, res) => {

    let token = req.body.idtoken

    let googleUser = await verify(token)

        .catch(e => {
            return res.estatus(403).json({
                ok: false,
                error: e
            });
        })

    Usuario.findOne({ email: googleUser.email }, (err, usuarioDB) => {

        if (err) {
            return res.status(500).json({
                ok: false,
                err
            });
        };

        if (usuarioDB) {

            if (usuarioDB.google === false) {
                return res.status(400).json({
                    ok: false,
                    err: {
                        message: 'Debe Autenticarse de manera normal'
                    }
                });

            } else {
                let token = jwt.sign({
                    usuario: usuarioDB
                }, process.env.SEED, { expiresIn: process.env.CADUCIDAD_TOKEN });


                return res.json({
                    ok: true,
                    usuario: usuarioDB,
                    token
                });
            }

        } else {
            // Si el Usuario NO existe en nuestra base de datos (Es la priemra vez que el usuario se registra)
            let usuario = new Usuario();

            usuario.nombre = googleUser.nombre;
            usuario.email = googleUser.email;
            usuario.img = googleUser.img;
            usuario.google = true;
            usuario.password = ':)';

            usuario.save((err, usuarioDB) => {
                if (err) {
                    return res.status(400).json({
                        ok: false,
                        err
                    });

                } else {
                    let token = jwt.sign({
                        usuario: usuarioDB
                    }, process.env.SEED, { expiresIn: process.env.CADUCIDAD_TOKEN });


                    return res.json({
                        ok: true,
                        usuario: usuarioDB,
                        token
                    });
                }
            });

        }

    });


});

    //    res.json({
    //        usuario: googleUser
    //   });

module.exports = app;