//Esto...
function sumar(a, b) {
    return a + b;
};
console.log(sumar(10, 20));

//Es lo mismo que esto, pero en uan funcion de Flecha...
let sumarF = (a, b) => a + b;
console.log(sumarF(20, 20));

//Ejercicio 1:
let Saludar = () => 'Hola Mundo';
console.log(Saludar());

//Ejercicio 2:
let Saludar2 = (nombre) => `Hola ${nombre}`;
console.log(Saludar2('Charlie'));