require('./config/config.js');

const express = require('express')
const app = express();


const bodyParser = require('body-parser');
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
app.use(bodyParser.json())




//GET
app.get('/usuario', function (req, res) {
    res.json('Get Usuario')
});

//POST
app.post('/usuario/:id', function (req, res) {
    let id = req.params.id;
    let body = req.body;

    if (body.nombre === undefined) {
        res.status(400).json({
            ok: false,
            mensaje: "El nombre es obligatorio"
        });
    }
    if (body.email === undefined) {
        res.status(400).json({
            ok: false,
            mensaje: "El email es obligatorio"
        });
    }
    else {
        res.json({
            id: id,
            Persona: body

        });
    }

});

//PUT
app.put('/usuario/:id', function (req, res) {
    let id = req.params.id;

    res.json({
        id: id
    })
});

//DELETE
app.delete('/usuario', function (req, res) {
    res.json('Delete Usuario')
});


