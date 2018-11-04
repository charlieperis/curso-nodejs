const express = require('express');
const Usuario = require('../models/usuario.js');
const { verificarToken, verificarAdminRole } = require('../middleware/autenticacion.js');
const bcrypt = require('bcrypt');
const _ = require('underscore');
const app = express();

//GET
app.get('/', (req, res) => {
    res.json('Hola Mundo!!!');
});

app.get('/usuarios', (req, res) => {
    Usuario.find({ estado: true }).exec((err, usuarios) => {

        if (err) {
            return res.status(400).json({
                ok: false,
                err 
            });
        }

        return res.json({
            usuarios
        });

    });

});


app.get('/mostrarusuario/:id', (req, res) => {
    let id = req.params.id;
    let body = _.pick(req.body, ['nombre', 'email']);

    Usuario.findById(id, body, { estado: true }, (err, usuarioDB) => {

        if (err) {
            return res.status(400).json({
                ok: false,
                err
            });
        }

        if (!usuarioDB) {
            return res.status(500).json({
                ok: false,
                err: {
                    message: 'El ID no es válido'
                }
            });
        }

        return res.json({
            ok: true,
            usuario: usuarioDB
        });

    });

});


//GET - listar los registros ue estan guardados en la base de datos (con parametro de paginador -limite- y -desde- ) (Ej de petición: localhost:3000/usuario?limite=10&desde=1)
app.get('/usuario', verificarToken, (req, res) => {


    let desde = req.query.desde || 0;
    desde = Number(desde) - 1;

    let limiteDefault = 20;
    let limite = req.query.limite || limiteDefault;
    limite = Number(limite) + 1;

    Usuario.find({ estado: true }, 'nombre email') //muestra todos los registro con {estado: true} y los campos que defino entre ''. SI no pongo nada, trae todos los campos.
        .skip(desde)
        .limit(limite)
        .exec((err, usuarios) => {

            if (err) {
                return res.status(400).json({
                    ok: false,
                    err
                });
            }

            Usuario.count({ estado: true }, (err, conteo) => {

                res.json({
                    ok: true,
                    usuarios: usuarios,
                    cuantos: conteo
                });

            });

        });

});



//POST - Agragar un registro a la base de datos
app.post('/usuario', [verificarToken, verificarAdminRole], (req, res) => {
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
app.put('/usuario/:id', [verificarToken, verificarAdminRole], (req, res) => {
    let id = req.params.id;
    //Acá definimos que campos SE PUEDEN MODIFICAR con el undescrore
    let body = _.pick(req.body, ['nombre', 'email', 'img', 'role', 'estado']);

    Usuario.findOneAndUpdate(id, body, { new: true, runValidators: true, context: 'query' }, (err, usuarioDB) => {

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



//DELETE (Cambia el estado de true a false, pero no elimina el registro) 
app.delete('/usuario/:id', [verificarToken, verificarAdminRole], (req, res) => {

    let id = req.params.id;

    let cambiarEstado = {
        estado: false
    }

    Usuario.findOneAndUpdate(id, cambiarEstado, { new: true }, (err, usuarioDB) => {

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
app.delete('/usuario/delete/:id', [verificarToken, verificarAdminRole], (req, res) => {

    let id = req.params.id;

    Usuario.findOneAndDelete(id, (err, usuarioBorrado) => {

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