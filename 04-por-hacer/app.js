const argv = require('./config/yargs.js').argv;
const colors = require('colors');

const porHacer = require('./por-hacer/por-hacer.js')

let comando = argv._[0];

switch (comando) {
    case 'crear':
        let tarea = porHacer.crear(argv.descripcion);
        console.log(tarea);
        break;

    case 'listar':
        let listado = porHacer.getListado();
        for (let tarea of listado) {
            console.log(`Tarea: ` + `${tarea.descripcion}`.green);
            console.log(`Estado// ` + `${tarea.completado}`.red);
        }
        break;

    case 'actualizar':
        console.log('Actualizar la tarea');
        break;

    default:
        console.log('Comando no reconocido')
}