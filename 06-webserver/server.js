const express = require('express');
const app = express();
const colors = require('colors');

const port = process.env.PORT || 3000;

//Se Incluye el helpers con datos globales para en cualqueir parte del sitio
const hbs = require('hbs');
require('./hbs/helpers.js');


app.use(express.static(__dirname + '/public'));

// Express HBS (app.set hace referencia al express)
hbs.registerPartials(__dirname + '/views/partials');
app.set('view engine', 'hbs');


app.get('/', (req, res) => {
    res.render('index', {
        nombre: 'Charlie'
    });
});

app.get('/about', (req, res) => {
    res.render('about', {
        nombre: 'Monse'
    });
});


/*
app.get('/data', (req, res) => {
    let salida = {
        nombre: 'Charlie',
        edad: 32,
        url: req.url
    }
    res.send(salida);
});
*/


app.listen(port, () => {
    console.log(`Escuchando peticiones del puerto ${port}`);
});