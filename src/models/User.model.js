const mongoose = require('mongoose');

const login = new mongoose.Schema(
    {
        name: {
            type: String,
            require: true,
            trim: true
        }, 
        email: {
            type: String,
            unique:true
        },
        numberPhone: {
            type: Number,
            default: 123-321
        }
    },
    {
        timestamps: true,
        versionKey: false
    }
);

const usuarios = new mongoose.model('usuarios', login);

module.exports = {usuarios};