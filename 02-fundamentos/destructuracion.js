let personaje = {
    nombre: 'Ramon',
    apellido: 'Sanchez',
    caracteristica: 'Narigón',

    getNombre: function() {
        return (`${nombre} ${apellido} ${caracteristica}`);
    }
};

let { nombre: elnombre, apellido, caracteristica } = personaje;

console.log(elnombre, apellido, caracteristica);