const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');

let Schema = mongoose.Schema;

let categoriaSchema = new Schema({
    nombre: {
        type: String,
        unique: true,
        required: [true, 'El nombre de la Categoría es obligatorio']
    },
    descripcion: {
        type: String,
        required: [true, 'La descripción de la Categoría es obligatorio']
    },
    img: {
        type: String,
        required: false
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
        ref: 'usuario'
    }
});


categoriaSchema.plugin(uniqueValidator, { mesagge: 'el {PATH} es obligatorio' });

module.exports = mongoose.model('categoria', categoriaSchema);