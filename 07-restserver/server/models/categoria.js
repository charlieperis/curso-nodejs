const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');

let Schema = mongoose.Schema;

let categoriaSchema = new Schema({
    nombre: {
        type: String,
        required: [true, 'El nombre de la Categoría es obligatorio']
    },
    descripcion: {
        type: String,
        required: [true, 'La descripción de la Categoría es obligatorio']
    },
    estado: {
        type: Boolean,
        default: true
    },
    fecha: {
        type: Date,
        default: Date.now()
    },
    usuario: {
        type: Schema.Types.ObjectId,
        ref: 'Usuario'
    }
});


categoriaSchema.plugin(uniqueValidator, { mesagge: 'el {PATH} es obligatorio' });

module.exports = mongoose.model('categoria', categoriaSchema);