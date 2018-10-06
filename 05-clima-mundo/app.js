const argv = require('./config/yargs.js').argv;
const lugar = require('./lugar/lugar.js');
const clima = require('./clima/clima.js');
const colors = require('colors');



let getInfo = async(direccion) => {
    let coors = await lugar.getLugarLatLng(direccion);
    let data = await clima.getClima(coors.lat, coors.lng);

    return `La temperatura en ` + `${coors.direccion}`.yellow + ` es de ` + `${data.main.temp} Grados`.red + ` y la Humedad de` + ` ${data.main.humidity} %`.green
}

getInfo(argv.direccion)
    .then(mensaje => console.log(mensaje))
    .catch(e => console.log(e));


/*
lugar.getLugarLatLng(argv.direccion)
    .then(resp => {
        console.log(resp);
    })
    .catch(e => console.log(e));



clima.getClima(-31.42008329999999, -64.1887761)
    .then(data => {
        console.log(`
        Temperatura: ` + `
        $ { data.main.temp }
        Grados `.green)
        console.log(`
        Humedad: ` + `
        $ { data.main.humidity } % `.yellow)
    })
    .catch(e => console.log(e));

*/