// >> Definimos el objeto..
let personaje = {
    nombre: 'Quijote',
    apellido: 'de la Mancha',
    caracteristica: 'Flaco',

    getPersonaje: function() {
        return `${this.nombre} ${this.apellido} ${this.caracteristica}`;
    }
};
// >> Esto..
let nombreP = personaje.nombre;
let apelldioP = personaje.apellido;
let caracteristicaP = personaje.caracteristica;
// >> Es lo mismo que esto usando destruturación..
let { nombre: elnombre, apellido, caracteristica } = personaje; // nombre: elnombre reeemplaza a la variable //

console.log(personaje.getPersonaje());
console.log(elnombre, apellido, caracteristica);