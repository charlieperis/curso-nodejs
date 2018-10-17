const express = require('express')
const app = express();

//PUERTO LOCAL
process.env.PORT = process.env.PORT || 3000;


//ENTORNO
process.env.NODE_ENV = process.env.NODE_ENV || 'dev';


//BASE DE DATOS

let urlDB;

if (process.env.NODE_ENV === 'dev') {
    urlDB = 'mongodb://localhost:27017/cafe';

} else {
    urlDB = 'mongodb://cafe-test:123qwe@ds133113.mlab.com:33113/charlie-test-db';
}

process.env.myUrlDB = urlDB;