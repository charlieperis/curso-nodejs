const express = require('express');
const app = express();
const Usuario = require('../models/usuario.js');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const {OAuth2Client} = require('google-auth-library');
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

    console.log(payload.name);
    console.log(payload.email);
    console.log(payload.picture);
  }


app.post('/google', (req, res) => {

    let token = req.body.idtoken

    verify(token)

    res.json({
        token: token
    });

});




module.exports = app;