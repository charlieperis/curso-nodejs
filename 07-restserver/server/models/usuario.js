const mongoose = require ('mongoose');
const uniqueValidator = require ('mongoose-unique-validator');

//definimos los roles posibles que puede tener nuestro sistema de datos
let rolesValidos = {
    values: ['ADMIN_ROLE', 'USER_ROLE'],
    message: 'EL Role {VALUE} no es válido'
}

let Schema = mongoose.Schema;

let usuarioSchema = new Schema({
    nombre: {
        type: String,
        required: [true, 'El nombre es obligatorio por favor!']
    },
    email: {
        type: String,
        unique: true,
        required: [true, 'El correo es necesario por favor!']
    },
    password: {
        type: String,
        required: [true, 'La contraseña es obligatoria por favor!']
    },
    img: {
        type: String,
        required: false
    },
    role: {
        type: String,
        default: 'USER_ROLE',
        enum: rolesValidos      
    },
    estado: {
        type: Boolean,
        default: true
    },
    google: {
        type: Boolean,
        default: false
    }
});


//con este metodo, ocultamos el password cuando devolvemos la información cargada
usuarioSchema.methods.toJSON = function() {
    let user = this;
    let userObject = user.toObject();
    delete userObject.password;

    return userObject;
}


// con este metodo lanzamos el error de todos los datos que son required en el Schema
usuarioSchema.plugin(uniqueValidator, { message: '{PATH} debe ser único.' });


module.exports = mongoose.model('usuario', usuarioSchema);


