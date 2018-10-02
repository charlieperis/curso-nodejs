const argv = require('./config/yargs.js').argv;
const colors = require('colors');

//console.log(argv);

let comando = argv._[0];

switch (comando) {
    case 'crear':
        console.log('Crear un a tarea nueva');
        break;

    case 'listar':
        console.log('Listar tareas guardadas');
        break;

    case 'actualizar':
        console.log('Actualizar la tarea');

    default:
        console.log('Comando no reconocido')
}