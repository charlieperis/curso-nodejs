const express = require('express');
const fs = require('fs');
const path = require('path');
let app = express();


app.get('/imagen/:tipo/:img', (req, res) => {

    let tipo = req.params.tipo;
    let img = req.params.img;

    let pathImage = path.resolve(__dirname, `../../uploads/${tipo}/${img}`);
    let noImgPath = path.resolve(__dirname, '../assets/no-image-found.png');

    if (fs.existsSync(pathImage)) {
        res.sendfile(pathImage);
    } else {
        res.sendfile(noImgPath);
    }

});



module.exports = app;