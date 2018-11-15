const express = require('express');
const sockectIO = require('socket.io');
const http = require('http');

const path = require('path');

const app = express();

let server = http.createServer(app);

const publicPath = path.resolve(__dirname, '../public');
const port = process.env.PORT || 3000;

app.use(express.static(publicPath));



// IO = Es la comunicación con e backend
module.exports.io = sockectIO(server);
require('./sockets/sockets.js');


server.listen(port, (err) => {
    if (err) throw new Error(err);
    console.log(`Servidor corriendo en puerto ${port}`);
});