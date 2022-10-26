const mongoose = require('mongoose')
const Schema = mongoose.Schema;
const uniqueValidator = require('mongoose-unique-validator');

const todoSchema = new Schema({

    tarea: {
        type: String,
        uniqued: true,
        required: [true, 'Tarea Requerido']
    },

    categoria: {
        type: String,
        required: [true, 'Categoria Requerida']
    },

    prioridad: {
        type: String,
        required: [true, 'Prioridad Requerida']
    },
    estado: {
        type: String,
        default: 'EN PROGRESO'
    },

    complete: {

        type: Boolean,
        default: false

    }

});

todoSchema.plugin(uniqueValidator, { message: '{PATH} debe de ser unico' });

module.exports = mongoose.model('Todo', todoSchema);