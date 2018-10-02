const argv = require('yargs')
    .command('crear', 'Crea una nueva tarea por hacer', {
        descripcion: {
            demand: true,
            alias: 'd',
            desc: 'Descripción de la tarea por hacer'
        }
    })
    .command('actualizar', 'Modifica las tareas guardada', {
        descripcion: {
            demand: true,
            alias: 'd',
            desc: 'Descripción de la tarea por hacer'
        },
        completado: {
            default: true,
            alias: 'c',
            desc: 'Marca como completado o pendiente una tarea'
        }
    })
    .help()
    .argv;

module.exports = {
    argv
}