let nombre = "Charlie"
let real = "Carlos"

//console.log(nombre + ' ' + real);
//console.log(`${nombre} ${real}`);

let nombreCompleto = nombre + ' ' + real;
let nombreTemaplet = `${nombre} ${real}`;

console.log(nombreCompleto === nombreTemaplet);

function getNombre() {
    return `${nombre} ${real}`;
}

console.log(`${ getNombre() }`)