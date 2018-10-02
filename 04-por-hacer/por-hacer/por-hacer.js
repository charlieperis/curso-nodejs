const fs = require('fs');
const colors = require('colors');

let listadoPorHacer = [];

const guardarDB = () => {

    let data = JSON.stringify(listadoPorHacer);

    fs.writeFile(`db/data.json`, data, (err) => {
        if (err) throw new Error('La tarea no se pudo guardar', err);
    });
}


const cargarDB = () => {
    try {
        listadoPorHacer = require('../db/data.json');
    } catch (error) {
        listadoPorHacer = [];
    }
}


const crear = (descripcion) => {

    cargarDB();

    let porHacer = {
        descripcion: descripcion,
        completado: false
    };

    listadoPorHacer.push(porHacer);

    guardarDB();

    return porHacer;

}

const getListado = () => {
    cargarDB();
    return listadoPorHacer;
}

module.exports = {
    crear,
    getListado
}