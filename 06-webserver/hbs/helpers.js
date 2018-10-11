const hbs = require('hbs');
const colors = require('colors');

hbs.registerHelper('getAnio', () => {
    return new Date().getFullYear();
});

let userS = 'EL Más Capito';

hbs.registerHelper('userStatus', () => {

    return (userS);
});