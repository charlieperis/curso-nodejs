
const {crearArchivo } = require ('./multiplicar/multiplicar');

let base = '7';

crearArchivo(base)
    .then(archivo => console.log(`El archivo tablas-del-${base} se creó correctamente`))
    .catch(err => console.log(err))
