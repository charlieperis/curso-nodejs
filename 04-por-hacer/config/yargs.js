const descripcion = {
    demand: true,
    alias: 'd',
    desc: 'Descripción de la tarea por hacer'
}

const completado = {
    default: true,
    alias: 'c',
    desc: 'Marca como completado o pendiente una tarea'
}


const argv = require('yargs')
    .command('crear', 'Crea una nueva tarea por hacer', {
        descripcion: descripcion,
    })
    .command('actualizar', 'Modifica las tareas guardada', {
        descripcion: descripcion,
        completado: completado
    })
    .command('borrar', 'Borra una nueva tarea', {
        descripcion: descripcion,

    })
    .help()
    .argv;

module.exports = {
    argv
}