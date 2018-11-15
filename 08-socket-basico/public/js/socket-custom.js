
// Esto mantiene pendiente de cualquier cambio de back-end
var socket = io();

// Los 'on' son para escuchar
socket.on('connect', function () {
    console.log('Conectado al Servidor');
});

socket.on('disconnect', function () {
    console.log('Perdimos conexión con Servidor');
});



// Los 'emit' son para emitir
socket.emit('enviarMensaje', {
    usuario: 'Charlie',
    mensaje: 'Hola Mundo'
}, function (resp) {
    console.log(resp);
});



// Escuchar informacion
socket.on('enviarMensaje', function (mensaje) {
    console.log('servidor:', mensaje)
});