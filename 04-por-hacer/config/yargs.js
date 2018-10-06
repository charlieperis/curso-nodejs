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
<<<<<<< HEAD
    .command('crear', 'Crea una nueva tarea por hacer', {
        descripcion: descripcion,
    })
    .command('actualizar', 'Modifica las tareas guardada', {
        descripcion: descripcion,
        completado: completado
    })
    .command('borrar', 'Borra una nueva tarea', {
        descripcion: descripcion,
=======
    .command('crear', 'Crea una nueva tarea por hacer', { //definimos el comando 'crear'
        descripcion: {
            demand: true,
            alias: 'd',
            desc: 'Descripción de la tarea por hacer'
        }
    })
    .command('actualizar', 'Modifica las tareas guardada', { //definimos el comando 'actualizar'
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
>>>>>>> ec3820b1629a0d903ab068e1df164f21a4035758
    })
    .help()
    .argv;

module.exports = {
    argv
}