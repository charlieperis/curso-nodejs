const express = require('express')
const app = express();

//PUERTO LOCAL
process.env.PORT = process.env.PORT || 3000;


//ENTORNO
process.env.NODE_ENV = process.env.NODE_ENV || 'dev';


//CADUCIDAD DEL TOKEN
process.env.CADUCIDAD_TOKEN = 60 * 60 * 24 * 30 //El token expira en 30 dias ( 60 segundos * 60 min * 24 horas * 30 días)


//SEED del Token
process.env.SEED = process.env.SEED || 'my-secret-seed-token'


//BASE DE DATOS
let urlDB;

if (process.env.NODE_ENV === 'dev') {
    urlDB = 'mongodb://localhost:27017/cafe';

} else {
    urlDB = process.env.MONGO_URI /*'mongodb://cafe-test:123qwe@ds133113.mlab.com:33113/charlie-test-db' */ /*Desde la terminal podemos ejecutar: heroku config para ver las configuraciones de entorno. Y para crearlas es: heroku congif:set NOMBRE_DE_EL_ENTORNO="valor"*/;
}

process.env.myUrlDB = urlDB;