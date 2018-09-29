//Requires
const fs = require('fs');

let listarTabla = (base, limite = 10) => {

    for (let i = 1; i <= limite; i++) {
        console.log(`${base} x ${i} = ${base * i}`); //Lista la tabla en consola
        //data += `${base} x ${i} = ${base * i} \n`
    }
}

let crearArchivo = (base, limite = 10) => {
    return new Promise((resolve, reject) => {

        if (!Number(base)) {
            reject(`El valor "${base}" no es un número`);
            return;
        }

        let data = '';

        for (let i = 1; i <= limite; i++) {
            //console.log(`${base} x ${i} = ${base * i}`); //Lista la tabla en consola
            data += `${base} x ${i} = ${base * i} \n`
        }

        fs.writeFile(`tablas/tabla-del-${base}-al-${limite}.txt`, data, (err) => {
            if (err)
                reject(err);
            else
                resolve(`El archivo 'tabla-del-${base}-al-${limite}.txt' ha sido creado`);
        });
    });
}

module.exports = {
    crearArchivo,
    listarTabla
}