//Esto..
setTimeout(function() {
    console.log('Holis con funcion normal');
}, 300);

//Es lo mismo que esto, pero con uan funcion de flecha..
setTimeout(() => {
    console.log('Holis con funcion de flecha');
}, 500);
//--------------------------------///

let getUsuarioById = (id, callback) => {
    let usuario = {
            nombre: 'Charlie',
            id: id,
        }
        //Esto es un ejemplo si: el usuario con id '2' no existe.. 
    if (id === 2) {
        callback(`El usuario con id ${id} no existe`);
    } else {
        callback(null, usuario);
    }
};

//Acá le pasamos el id: getUsuarioById(1 ...
getUsuarioById(1, (err, usuario) => {
    if (err) {
        return console.log(err)
    } else {
        console.log('Este es el usuario', usuario);
    }
});