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
let getEmpleado = async(id) => {

    let empleadoDB = empleados.find(empleado => empleado.id === id)
        //Si NO existe (!) un empleado, devuelve esto:
    if (!empleadoDB) {
        throw new Error(`No existe el usuario con el id ${id}`)
            //Si existe devuelve esto:
    } else {
        return empleadoDB;
    }
}




//--- Declaración de SALARIOS
let getSalario = async(empleado) => {

    let salarioDB = salarios.find(salario => salario.id === empleado.id);

    //Si NO existe (!) un salario, devuelve esto:
    if (!salarioDB) {
        throw new Error(`No hay un salario para ${empleado.nombre}`);
        //Si existe salario, devuelve esto:
    } else {
        return {
            nombre: empleado.nombre,
            salario: salarioDB.salario,
            id: empleado.id
        };
    }
}



let getInformacion = async(id) => {

    let empleado = await getEmpleado(id);
    let resp = await getSalario(empleado);

    return `El salario de  ${resp.nombre} es de $ ${resp.salario}`
};

getInformacion(1)
    .then(mensaje => console.log(mensaje))
    .catch(err => console.log(err));