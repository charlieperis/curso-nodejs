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
let getEmpleado = (id, callback) => {

    let empleadoDB = empleados.find(empleado => empleado.id === id)
    
    //Si NO existe (!) un empleado, devuelve esto:
    if (!empleadoDB) {
        callback(`No existe el usuario con el id ${id}`)
    //Si existe devuelve esto:
    } else {
        callback(null, empleadoDB);
    }
}



//--- Declaración de SALARIOS
let getSalario = (empleado, callback) => {

    let salarioDB = salarios.find(salario => salario.id === empleado.id);
    
    //Si NO existe (!) un salario, devuelve esto:
    if (!salarioDB) {
        callback(`No hay un salario para ${empleado.nombre}`);
    //Si existe devuelve esto:
    } else {
        callback(null, {
            nombre: empleado.nombre,
            salario: salarioDB.salario,
            id: empleado.id
        });
    }
}



//--- Devolución de CONSULTAS de Empleados y sus Salarios poniendo el id, en este caso el 2
getEmpleado(2, (err, empleado) => {
   
    if (err) {
        return console.log(err);
    }

    getSalario(empleado, (err, resp) => {
        if (err) {
            return console.log(err);
        };

        console.log(`El salario de ${resp.nombre} es de ${resp.salario}`)
    })

    //Acá imprime todo el array del empleado
    console.log(empleado)
    //Acá imprime un parametro del array, por ejemplo, el nombre solamente
    console.log(empleado.nombre)

});