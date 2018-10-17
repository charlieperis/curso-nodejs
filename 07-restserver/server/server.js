//Configuracion del PUERTO
require('./config/config.js');


const express = require('express')
const app = express();
const mongoose = require('mongoose');

const bodyParser = require('body-parser');
//parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))
//parse application/json
app.use(bodyParser.json())


app.use(require('./routes/usuario.js'));


mongoose.connect(process.env.myUrlDB, (err, res) => {
    if (err) throw error;
    console.log('Base de datos Online OK');
});


app.listen(process.env.PORT, () => {
    console.log(`Escuchando el puerto`, process.env.PORT)
})