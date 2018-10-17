const express = require('express');
const app = express();
const Usuario = require('../models/usuario.js');
const bcrypt = require('bcryptjs');




app.post('/login', (req, res) => {
    res.json({
        ok: true
    })
});





module.exports = app;