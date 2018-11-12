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
let io = sockectIO(server);


io.on('connection', (client) => {
    console.log('Usuario conectado');

    client.emit('enviarMensaje', {
        usuario: 'Administrado',
        mensaje: 'Bienvenido a esta App!!'

    });

    client.on('disconnect', () => {
        console.log('Usuario desconectado!');
    });

    //Escuchar cliente
    client.on('enviarMensaje', (mensaje, callback) => {
        if (mensaje.usuario) {
            callback({
                resp: 'Todo salió bien! :)'
            });
        } else {
            callback({
                resp: 'Todo salio MAL! :('
            });
        }
    });

});

server.listen(port, (err) => {
    if (err) throw new Error(err);
    console.log(`Servidor corriendo en puerto ${port}`);
});