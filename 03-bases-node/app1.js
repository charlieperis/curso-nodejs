const argv = require('yargs')
    .command('listar', 'Imprime en cosola la tabla de multiplicar', {
        base: {
            demand: true,
            alias: 'b'
        },
        limite: {
            alias: 'l',
            default: 10
        }
    })
    .command('crear', 'genera un archivo con la tabla y el limite selecionado', {
        base: {
            demand: true,
            alias: 'b'
        },
        limite: {
            alias: 'l',
            default: 10
        }
    })
    .help()
    .argv;

const { crearArchivo, listarTabla } = require('./multiplicar/multiplicar');

//por consola escribimos node app --base=5
//console.log(process.argv);
//let argv2 = process.argv;
//console.log(argv);
//console.log('Base:', argv.base);
//console.log('Limite:', argv.limite);
let comando = argv._[0];

switch (comando) {
    case 'listar': //node app1 listar --limite=5 --base 10
        console.log('Listar');
        listarTabla(argv.base, argv.limite);
        break;

    case 'crear': // node app1 crear --limite=100 --base=5 (o cluaquier número)
        console.log('Crear');
        crearArchivo(argv.base, argv.limite)
            .then(archivo => console.log(`El archivo tablas-del-${archivo} se creó correctamente`))
            .catch(err => console.log(err))
        break;

    default:
        console.log('No es un comando válido');
        break;
}