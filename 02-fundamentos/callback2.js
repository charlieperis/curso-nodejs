//Mini base de datos para probar. Empleados y Salarios:
let empleados = [{
    id: 1,
    nomnre: 'Charlie',
}, {
    id: 2,
    nombre: 'Monserrat',
}, {
    id: 3,
    nombre: 'Carolina',
}];

let salarios = [{
    id: 1,
    salario: 1000,
}, {
    id: 2,
    salario: 1500,
}];

//Empleados
let getEmpleado = (id, callback) => {

    let empleadoDB = empleados.find(empleado => empleado.id === id)

    if (!empleadoDB) {
        callback(`No existe el usuario con el id ${id}`)
    } else {
        callback(null, empleadoDB);
    }
}

getEmpleado(2, (err, empleado) => {
    if (err) {
        return console.log(err)
    }
    console.log(empleado);
});