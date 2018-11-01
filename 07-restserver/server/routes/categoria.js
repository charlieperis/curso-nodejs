const express = require('express');
const Usuario = require('../models/usuario.js');
const Categoria = require('../models/categoria.js');
const _ = require('underscore');
const app = express();


app.get('/categoria', (req, res) => {
    res.json('Estamos en las seccion Categorias');
});


// Ver todas las Categoías
app.get('/categorias', (req, res) => {

    Categoria.find({ estado: true }).exec((err, categorias) => {
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

// Insertar una nueva categoría
app.post('/categoria', (req, res) => {

    let body = req.body;

    let categoria = new Categoria({
        nombre: body.nombre,
        descripcion: body.descripcion
    });

    categoria.save((err, categoriaDB) => {

        if (err) {
            return res.status(400).json({
                ok: false,
                err
            });
        }

        return res.json({
            ok: true,
            categoriaDB
        });
    });
});



//Actualizar una Categoría
app.put('/categoria/:id', (req, res) => {

    let id = req.params.id;
    let body = _.pick(req.body, ['nombre', 'descripcion', 'estado']);

    Categoria.findOneAndUpdate(id, body, { new: true, runValidator: true, context: 'query' }, (err, categoriaDB) => {

        if (err) {
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
app.delete('/categoria/:id', (req, res) => {

    let id = req.params.id;

    let cambiarEstado = {
        estado: false
    }

    Categoria.findOneAndUpdate(id, cambiarEstado, { new: true }, (err, categoriaDB) => {

        if (err) {
            return res.status(400).json({
                ok: false,
                err
            });
        }

        res.json({
            ok: true,
            categoria: categoriaDB
        })
    });

});





module.exports = app;