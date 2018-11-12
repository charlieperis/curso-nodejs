const express = require('express');
const { verificarTokenImg } = require('../middleware/autenticacion.js');
const fs = require('fs');
const path = require('path');
let app = express();


app.get('/imagen/:tipo/:img', verificarTokenImg, (req, res) => {

    let tipo = req.params.tipo;
    let img = req.params.img;

    let pathImage = path.resolve(__dirname, `../../uploads/${tipo}/${img}`);
    let noImgPath = path.resolve(__dirname, '../assets/no-image-found.png');

    if (fs.existsSync(pathImage)) {
        res.sendFile(pathImage);
    } else {
        res.sendFile(noImgPath);
    }

});



module.exports = app;