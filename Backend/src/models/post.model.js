const { Schema, model } = require('mongoose');

const Post = new Schema({
    image: String,
    title: String,
    category: String,
    comentarios: String,
    description: {
        code: {
            type: String, 
            default: ''
        },
        text: String
    },
    options: String,
    fecha_creacion: String,
    fecha_modificacion: String,
    like: String,
    tags: 
        { type: Array,
            default: [] 
        }
});

module.exports = model('post', Post)

['codigo Js', 'Codigo' ]