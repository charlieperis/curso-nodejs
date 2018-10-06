const argv = require('yargs')
    .options({
        direccion: {
            demand: true,
            alias: 'd',
            desc: 'Nombre de la ciudad que queremos consultar'
        }
    }).argv


module.exports = {
    argv
}