//Mini base de datos para probar. Empleados y Salarios:
let empleados = [{
    id: 1,
    nombre: 'Charlie',
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


//--- Declaración de EMPLEADOS
let getEmpleado = (id) => {

    return new Promise((resolve, reject) => {

        let empleadoDB = empleados.find(empleado => empleado.id === id)
            //Si NO existe (!) un empleado, devuelve esto:
        if (!empleadoDB) {
            reject(`No existe el usuario con el id ${id}`)
                //Si existe devuelve esto:
        } else {
            resolve(empleadoDB);
        }

    });
}




//--- Declaración de SALARIOS
let getSalario = (empleado) => {

    return new Promise((resolve, reject) => {

        let salarioDB = salarios.find(salario => salario.id === empleado.id);

        //Si NO existe (!) un salario, devuelve esto:
        if (!salarioDB) {
            reject(`No hay un salario para ${empleado.nombre}`);
            //Si existe devuelve esto:
        } else {
            resolve({
                nombre: empleado.nombre,
                salario: salarioDB.salario,
                id: empleado.id
            });
        }
    });
}

//--- Resultado de la Consulta
getEmpleado(2).then(empleado => {

    getSalario(empleado).then(resp => {
        console.log(`El salario de ${resp.nombre} es de $ ${resp.salario}`)
    }, (err) => {
        console.log(err);
    });

}, (err) => {
    console.log(err);
});