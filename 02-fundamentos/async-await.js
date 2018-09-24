let getNombre = async() => {
    return 'Charlie';
};


getNombre().then(nombre => {
        console.log(nombre);
    })
    .catch(e => {
        console.log('Error de ASYNC', e)
    });



let getSaludo = async() => {
    let nombre = await getNombre()
    return `Hola ${nombre}`;
};

getSaludo().then(saludo => {
    console.log(saludo);
});