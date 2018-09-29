const { crearArchivo } = require('./multiplicar/multiplicar');

//por consola escribimos node app --base=5
//console.log(prosses.argv);
let argv = process.argv; //acá ejecuta el argv  (argumento) de progress (es un parametro propio de node)
let parametro = argv[2]; //acá toma el segundo (2) parametro de '--base=5', es decir el '5'
let base = parametro.split('=')[1] //acá separa con .split y toma el segundo parametro de '--base=5', es decir el '5' *(recordando que siemre en js se cuanta desde el 0)

//console.log(base)


crearArchivo(base)
    .then(archivo => console.log(`El archivo tablas-del-${archivo} se creó correctamente`))
    .catch(err => console.log(err))


//*** Para ejecutar en consola: node app --base=5 (5 ó cualquier número)