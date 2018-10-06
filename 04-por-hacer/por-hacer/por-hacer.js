const fs = require('fs');
const colors = require('colors');




const cargarDB = () => { //cargarDB se define en una funcion de flecha para cargar la lista de tareas que guardamos
    try {
        listadoPorHacer = require('../db/data.json'); //busca el archivo '../db/data.jason' e intenta (con try) almacenar en la variable 'listadoPorHacer' su contenido...
    } catch (error) {
        listadoPorHacer = []; //si aun no guardamos nada o si el archivo no contiene nada, genera un arreglo (array) vacío para que
    }
}



let listadoPorHacer = []; //inicializa el 'listadoPorHacer' como un arreglo vacío

const guardarDB = () => { //guardasDB se define como una funcion de flecha para guardar en una lista, las tareas...

    let data = JSON.stringify(listadoPorHacer); //guarda en la variable 'data' el 'listadoPorHacer' en formato válido JSON...

    fs.writeFile(`db/data.json`, data, (err) => { //escribe la 'data' en el archivo 'db/data.json'
        if (err) throw new Error('La tarea no se pudo guardar', err); //si se produce algún error, aparece ese mensaje...
    });
}




const crear = (descripcion) => { //la funcion 'crear' se sefine como una funcion de flecha para crear una nueva tarea

    cargarDB(); //llama a la funcion cargarDB que contiene el 'listadoPorHacer'...

    let porHacer = { //en la variable 'porHacer' que cada elemento contiene una 'descripcion' y un 'completado'
        descripcion: descripcion,
        completado: false
    };

    listadoPorHacer.push(porHacer); //se hace un push (o se escribe) la información almacenada en 'porHacer' y se agrega al 'listadoPorHacer'

    guardarDB(); //guarda en la base de datos...

    return porHacer // devuelve la tarea que acabamos de crear

}


const getListado = () => { //la funcion de flecha getListado carga la lista de tareas
    cargarDB(); //primero llama a la funcion cargarDB que carga los datos que tenemos guardados en nuestro JSON
    return listadoPorHacer; //y nos muestra el 'listadoPorHacer'
}


const actualizar = (descripcion, completado = true) => {

    cargarDB();

    let index = listadoPorHacer.findIndex(tarea => tarea.descripcion === descripcion);

    if (index >= 0) {
        listadoPorHacer[index].completado = completado;
        guardarDB();
        return true;
    } else {
        return false;
    }

}


const borrar = (descripcion) => {

    cargarDB();

    let nuevoListado = listadoPorHacer.filter(tarea => tarea.descripcion !== descripcion);

    if (listadoPorHacer.length === nuevoListado.length) {
        return false;
    } else {
        listadoPorHacer = nuevoListado;
        guardarDB();
        return true;
    }

}


module.exports = { //exportamos las funciones que necesitamos usar externamente
    crear,
    getListado,
    actualizar,
    borrar
}