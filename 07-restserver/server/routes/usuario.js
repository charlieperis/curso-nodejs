const express = require('express')
const app = express();
const Usuario = require('../models/usuario.js');

const bcrypt = require('bcryptjs');

const _ = require('underscore');


//GET
app.get('/', function (req, res) {
    res.json('Hola Mundo!!!');
});


//GET
app.get('/usuario', function (req, res) {

    let desde = req.query.desde || 0;
    desde = Number(desde) - 1;

    let limiteDefault = 20;
    let limite = req.query.limite || limiteDefault;
    limite = Number(limite) + 1;

    Usuario.find({estado: true}, 'nombre email') //muestra todos los registro con {estado: true} y los campos que defino entre ''. SI no pongo nada, trae todos los campos.
        .skip(desde)
        .limit(limite)
        .exec((err, usuarios) => {

            if (err) {
                return res.status(400).json({
                    ok: false,
                    err
                });
            }

            Usuario.count({estado: true}, (err, conteo) => {

                res.json({
                    ok: true,
                    usuarios: usuarios,
                    cuantos: conteo
                });

            });

        });

});



//POST
app.post('/usuario', function (req, res) {
    let body = req.body;

    let usuario = new Usuario({
        nombre: body.nombre,
        email: body.email,
        password: bcrypt.hashSync(body.password, 10),
        role: body.role
    });

    usuario.save((err, usuarioDB) => {
        if (err) {
            return res.status(400).json({
                ok: false,
                err
            });
        }
        res.json({
            ok: true,
            usuario: usuarioDB
        });
    });

});



//PUT - actualiza los datos
app.put('/usuario/:id', function (req, res) {
    let id = req.params.id;
    //Acá definimos que campos SE PUEDEN MODIFICAR con el undescrore
    let body = _.pick(req.body, ['nombre', 'email', 'img', 'role', 'estado']);

    Usuario.findByIdAndUpdate(id, body, { new: true, runValidators: true, context: 'query' }, (err, usuarioDB) => {

        if (err) {
            return res.status(400).json({
                ok: false,
                err
            });
        }

        res.json({
            ok: true,
            usuario: usuarioDB
        });

    });

});



//DELETE (Cambia el esta do de true a false, pero no elimina el registro) 
app.delete('/usuario/:id', function (req, res) {

    let id = req.params.id;

    let cambiarEstado = {
        estado: false
    }

    Usuario.findByIdAndUpdate(id, cambiarEstado, { new: true }, (err, usuarioDB) => {

        if (err) {
            return res.status(400).json({
                ok: false,
                err
            });
        }

        res.json({
            ok: true,
            usuario: usuarioDB
        });

    });

});



//DELETE (Borra definitivamente el registro) 
app.delete('/usuario/delete/:id', function (req, res) {

    let id = req.params.id;

    Usuario.findByIdAndRemove(id, (err, usuarioBorrado) => {

        if (err) {
            return resstatus(400).json({
                Ok: false,
                err
            });
        }

        if (!usuarioBorrado) {
            return res.status(400).json({
                Ok: false,
                err: {
                    message: 'Usuario no encontrado'
                }
            });
        }

        res.json({
            Ok: true,
            usuario: usuarioBorrado
        });

    });


});




module.exports = app;