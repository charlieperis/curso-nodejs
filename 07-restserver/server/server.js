//Configuracion del PUERTO
require('./config/config.js');

const express = require('express');
const app = express();

const mongoose = require('mongoose');

const bodyParser = require('body-parser');

//parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));
//parse application/json
app.use(bodyParser.json());


//habilitar la carpeta public
app.use(express.static(__dirname + '../../public'));


//Configuración global de rutas (aca se cargan todas las rutas para hacer las peticiones)
app.use(require('./routes/index.js'));


//Configuración de MongOose para la base de datos
mongoose.set('useCreateIndex', true);
mongoose.connect(process.env.myUrlDB, { useNewUrlParser: true }, (err, res) => {
    if (err) throw error;
    console.log('Base de datos Online OK');
});

app.listen(process.env.PORT, () => {
    console.log(`Escuchando el puerto`, process.env.PORT)
})