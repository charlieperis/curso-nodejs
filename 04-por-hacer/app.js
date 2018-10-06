const argv = require('./config/yargs.js').argv; //se llama al al yargs, que es quien tiene la configuracion de nuestros comandos argv...
const colors = require('colors'); //se llama color, que es para enriquecer el texto en consola...

const porHacer = require('./por-hacer/por-hacer.js'); //se llama al js que ejecuta las funciones...



let comando = argv._[0]; //definimos comando y le decimos que necesitamos obtener la primera posicion de argv...

switch (comando) {
    case 'crear': //en caso de introducir el comando 'crear'...
        let tarea = porHacer.crear(argv.descripcion); //guarda en la variable 'tarea' los parametros de 'porHacer'
        console.log(tarea); //muestra por consola la tarea cargada...
        break;

    case 'listar'://en caso de introducir el comando 'listar'... 
        let listado = porHacer.getListado(); //guarda en la variable 'listado'
        for (let tarea of listado) { //hace un for de las tareas obtenidas del listado y las muestar en consola
            console.log(`Tarea: ` + `${tarea.descripcion}`.green);
            console.log(`Estado// ` + `${tarea.completado}`.red);
        }
        break;

    case 'actualizar':
        let actualizado = porHacer.actualizar(argv.descripcion, argv.completado);
        console.log(actualizado);
        break;

    case 'borrar':
        let borrado = porHacer.borrar(argv.descripcion);
        console.log(borrado);
        break;

    default:
        console.log('Comando no reconocido')
}