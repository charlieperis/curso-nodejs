const express = require('express');
const Usuario = require('../models/usuario.js');
const Categoria = require('../models/categoria.js');
const { verificarToken, verificarAdminRole } = require('../middleware/autenticacion.js');
const _ = require('underscore');
const app = express();


app.get('/categoria', (req, res) => {
    res.json('Estamos en las seccion Categorias');
});


// Ver todas las Categoías
app.get('/categorias', (req, res) => {

    Categoria.find({ estado: true })
        .sort('nombre') //Ordena por algun parametro, en esta caso lo ordena por el nombre de als categorias
        .populate('usuario', 'nombre role') //Trae los datos del usuario que creó esa categorias (ver Schema de Categoria)
        .exec((err, categorias) => {
        
        if (err) {
            return res.status(400).json({
                ok: false,
                err
            });
        }

        return res.status(200).json({
            categorias
        });
    });
});




//Ver una Categoría por id
app.get('/categoria/:id', (req, res) => {

    let id = req.params.id;
    let body = _.pick(req.body, ['nombre', 'descripcion', 'estado']);

    Categoria.findById(id, body, { estado: true }, (err, categoriaDB) => {

        if (err) {
            return res.status(400).json({
                ok: false,
                err
            });
        }

        if (!categoriaDB) {
            return res.status(500).json({
                ok: false,
                err: {
                    message: 'El ID no es válido'
                }
            });
        }

        return res.json({
            ok: true,
            categoria: categoriaDB
        });

    });
});


// Insertar una nueva categoría
app.post('/categoria', [verificarToken, verificarAdminRole], (req, res) => {

    let body = req.body;

    let categoria = new Categoria({
        nombre: body.nombre,
        descripcion: body.descripcion,
        usuario: req.usuario._id
    });

    categoria.save((err, categoriaDB) => {

        if (err) {
            return res.status(400).json({
                ok: false,
                err
            });
        }

        if (!categoriaDB) {
            return res.status(500).json({
                ok: false,
                err
            });
        }

        return res.json({
            ok: true,
            categoria: categoriaDB
        });
    });
});


//Actualizar una Categoría
app.put('/categoria/:id', [verificarToken, verificarAdminRole], (req, res) => {

    let id = req.params.id;
    let body = _.pick(req.body, ['nombre', 'descripcion', 'estado']);

    Categoria.findByIdAndUpdate(id, body, { new: true, runValidators: true, context: 'query' }, (err, categoriaDB) => {

        if (err) {
            return res.status(400).json({
                ok: false,
                err
            });
        }

        if (!categoriaDB) {
            return res.status(400).json({
                ok: false,
                err
            });
        }

        return res.json({
            ok: true,
            categoria: categoriaDB
        });

    });
});



//Borrar una Categoría (cambiando de estado a false)
app.delete('/categoria/:id', [verificarToken, verificarAdminRole], (req, res) => {

    let id = req.params.id;

    let cambiarEstado = {
        estado: false
    }

    Categoria.findByIdAndUpdate(id, cambiarEstado, { new: true }, (err, categoriaDB) => {

        if (err) {
            return res.status(400).json({
                ok: false,
                err
            });
        }

        if (!categoriaDB) {
            return res.status(400).json({
                ok: false,
                err: {
                    message: 'Esta categoria no existe'
                }
            });
        }

        res.json({
            ok: true,
            message: 'Categoria dada de Baja'
        })
    });

});





module.exports = app;