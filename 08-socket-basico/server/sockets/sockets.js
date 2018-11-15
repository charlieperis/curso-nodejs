
const { io } = require('../server');

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
