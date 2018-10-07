const express = require('express');
const app = express();
const hbs = require('hbs');

app.use(express.static(__dirname + '/public'));

// Express HBS (app.set hace referencia al express)
hbs.registerPartials(__dirname + '/views/partials');
app.set('view engine', 'hbs');

app.get('/', (req, res) => {
    res.render('index', {
        nombre: 'Charlie',
        anio: new Date().getFullYear()
    });
});

app.get('/about', (req, res) => {
    res.render('about', {
        nombre: 'Monse',
        anio: new Date().getFullYear()
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


app.listen(3000, () => {
    console.log('Escuchando peticiones del puerto 3000');
});